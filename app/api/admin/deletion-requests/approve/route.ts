import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { requestId } = await request.json()

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }

    // Verify admin authentication
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {},
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use admin client to get the deletion request and story
    const adminClient = createAdminClient()

    // Get the deletion request
    const { data: deletionRequest, error: fetchError } = await adminClient
      .from('deletion_requests')
      .select('*')
      .eq('id', requestId)
      .single()

    if (fetchError || !deletionRequest) {
      return NextResponse.json(
        { error: 'Deletion request not found' },
        { status: 404 }
      )
    }

    // Soft delete the story
    const { error: deleteError } = await adminClient
      .from('stories')
      .update({
        deleted_at: new Date().toISOString(),
        deletion_reason: 'User requested deletion via: ' + deletionRequest.reason,
      })
      .eq('slug', deletionRequest.story_slug)

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to delete story' },
        { status: 500 }
      )
    }

    // Update deletion request status
    const { error: updateError } = await adminClient
      .from('deletion_requests')
      .update({
        status: 'resolved',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', requestId)

    if (updateError) {
      console.error('Error updating deletion request:', updateError)
    }

    console.log(`[Approved] Deletion request: ${deletionRequest.story_slug}`)

    return NextResponse.json({
      success: true,
      message: 'Deletion request approved and story soft-deleted',
    })
  } catch (err) {
    console.error('Error approving deletion request:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
