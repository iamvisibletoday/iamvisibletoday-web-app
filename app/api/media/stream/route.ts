import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { verifySessionToken } from '@/lib/media/session-tokens'

/**
 * Server-side media streaming endpoint
 * Never exposes URLs to client - streams directly from server
 * Prevents bot scraping and URL sharing
 *
 * Security:
 * - No signed URLs sent to client
 * - Access control enforced server-side
 * - Published story media: public access
 * - Submission media: admin-only access
 * - Deleted stories: 410 Gone
 * - Cache-Control headers prevent caching and downloading
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const bucket = searchParams.get('bucket')
    const path = searchParams.get('path')
    const token = searchParams.get('token')

    if (!bucket || !path) {
      return NextResponse.json(
        { error: 'bucket and path are required' },
        { status: 400 }
      )
    }

    // Validate bucket
    if (!['photos', 'voice-notes'].includes(bucket)) {
      return NextResponse.json(
        { error: 'Invalid bucket' },
        { status: 400 }
      )
    }

    const adminClient = createAdminClient()

    // Check if user is admin (can bypass token requirement)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const isAdmin = user && user.user_metadata?.role === 'admin'

    // For non-admins: token is required
    if (!isAdmin && !token) {
      return NextResponse.json(
        { error: 'Access denied - session required' },
        { status: 403 }
      )
    }

    // For non-admins: validate token
    if (!isAdmin && token) {
      const isValidToken = verifySessionToken(token)
      if (!isValidToken) {
        return NextResponse.json(
          { error: 'Access denied - invalid or expired session' },
          { status: 403 }
        )
      }
    }

    // Check if file is from a published story (public access allowed)
    const { data: stories, error: storiesError } = await adminClient
      .from('stories')
      .select('slug, deleted_at, photo_url, voice_url')
      .or(`photo_url.eq.${path},voice_url.eq.${path}`)
      .limit(1)

    if (storiesError) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Check if story exists and is not deleted
    const story = stories?.[0]
    if (!story) {
      // File might be from submission (not yet approved) - requires admin auth
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // Only admins can access submission media
      if (!user || user.user_metadata?.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized - admin access required' },
          { status: 401 }
        )
      }

      const { data: submissions } = await adminClient
        .from('submissions')
        .select('id, photo_url, voice_url')
        .or(`photo_url.eq.${path},voice_url.eq.${path}`)
        .limit(1)

      if (!submissions || submissions.length === 0) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        )
      }
      // Submission exists and user is admin, allow access
    } else {
      // Story found - verify not deleted (public access)
      if (story.deleted_at) {
        return NextResponse.json(
          { error: 'Content no longer available' },
          { status: 410 } // 410 Gone
        )
      }
    }

    // Download file from storage
    const { data, error } = await adminClient.storage
      .from(bucket)
      .download(path)

    if (error || !data) {
      console.error('Error downloading file:', error)
      return NextResponse.json(
        { error: 'Failed to stream media' },
        { status: 500 }
      )
    }

    // Determine content type based on bucket
    const contentType = bucket === 'photos'
      ? 'image/jpeg'
      : 'audio/webm'

    // Stream response with headers preventing download and caching
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': data.size.toString(),
        'Content-Disposition': 'inline; filename="protected"', // Display inline, prevent save-as
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, private', // Prevent caching
        'Pragma': 'no-cache',
        'Expires': '-1',
        'X-Content-Type-Options': 'nosniff', // Prevent MIME type sniffing
        'X-Frame-Options': 'DENY', // Prevent framing
        'X-Download-Options': 'noopen', // IE: prevent automatic download
        'Referrer-Policy': 'no-referrer', // Don't send referrer on external requests
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()', // Restrict browser features
      },
    })
  } catch {
    // Return generic error to avoid leaking internal details
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
