import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * Generate signed URL for media file
 * For published stories: accessible to public
 * For submissions: only accessible to admins
 *
 * Security: URLs expire after 2 minutes to prevent sharing
 * Fresh URLs requested automatically to prevent distribution
 * Even if URL is copied, it expires before it can be shared with others
 */
export async function POST(request: NextRequest) {
  try {
    const { bucket, path } = await request.json()

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

    // Check if file is from a published story (public access allowed)
    const { data: stories, error: storiesError } = await adminClient
      .from('stories')
      .select('slug, deleted_at, photo_url, voice_url')
      .or(`photo_url.eq.${path},voice_url.eq.${path}`)
      .limit(1)

    if (storiesError) {
      console.error('Error verifying story:', storiesError)
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

    // Generate signed URL with 2-minute expiration
    // Very short expiration prevents URL sharing - URLs expire before they can be shared
    // Each page load requests a fresh URL from the server
    const SIGNED_URL_EXPIRATION = 120 // 2 minutes in seconds
    const { data: urlData, error: urlError } = await adminClient.storage
      .from(bucket)
      .createSignedUrl(path, SIGNED_URL_EXPIRATION)

    if (urlError || !urlData) {
      console.error('Error creating signed URL:', urlError)
      return NextResponse.json(
        { error: 'Failed to generate access URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      signedUrl: urlData.signedUrl,
      expiresAt: Date.now() + SIGNED_URL_EXPIRATION * 1000, // Client can cache until expiration
    })
  } catch (err) {
    console.error('Signed URL generation error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
