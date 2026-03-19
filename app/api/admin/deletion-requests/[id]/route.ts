import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const { status, adminNotes, deletionType } = await request.json()

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be approved or rejected' },
        { status: 400 }
      )
    }

    if (
      status === 'approved' &&
      deletionType &&
      !['soft', 'hard'].includes(deletionType)
    ) {
      return NextResponse.json(
        { error: 'Invalid deletion type. Must be soft or hard' },
        { status: 400 }
      )
    }

    // Get the deletion request
    const adminClient = createAdminClient()
    const { data: deletionRequest, error: fetchError } = await adminClient
      .from('deletion_requests')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !deletionRequest) {
      return NextResponse.json(
        { error: 'Deletion request not found' },
        { status: 404 }
      )
    }

    // If approving, delete the story (soft or hard based on deletionType)
    if (status === 'approved') {
      const finalDeletionType = deletionType || 'soft'

      if (finalDeletionType === 'soft') {
        // Soft delete: set deleted_at timestamp and remove submission
        try {
          // Delete from submissions table (removes from queue)
          await adminClient
            .from('submissions')
            .delete()
            .eq('story_slug', deletionRequest.story_slug)

          // Soft delete story (hide from public)
          const { error: deleteError } = await adminClient
            .from('stories')
            .update({
              deleted_at: new Date().toISOString(),
              deletion_reason: `User requested deletion: ${deletionRequest.reason}`,
            })
            .eq('slug', deletionRequest.story_slug)

          if (deleteError) {
            console.error('Error soft deleting story:', deleteError)
            return NextResponse.json(
              { error: 'Failed to delete story' },
              { status: 500 }
            )
          }
        } catch (err) {
          console.error('Error in soft delete process:', err)
          return NextResponse.json(
            { error: 'Failed to delete story and related records' },
            { status: 500 }
          )
        }
      } else if (finalDeletionType === 'hard') {
        // Hard delete: permanently remove from database
        // Also remove associated submission and deletion request records
        try {
          // Delete from deletion_requests table
          await adminClient
            .from('deletion_requests')
            .delete()
            .eq('story_slug', deletionRequest.story_slug)

          // Delete from submissions table
          await adminClient
            .from('submissions')
            .delete()
            .eq('story_slug', deletionRequest.story_slug)

          // Delete from stories table
          const { error: deleteError } = await adminClient
            .from('stories')
            .delete()
            .eq('slug', deletionRequest.story_slug)

          if (deleteError) {
            console.error('Error hard deleting story:', deleteError)
            return NextResponse.json(
              { error: 'Failed to delete story' },
              { status: 500 }
            )
          }
        } catch (err) {
          console.error('Error in hard delete process:', err)
          return NextResponse.json(
            { error: 'Failed to delete story and related records' },
            { status: 500 }
          )
        }
      }
    }

    // Update the deletion request status
    const { error: updateError } = await adminClient
      .from('deletion_requests')
      .update({
        status,
        admin_notes: adminNotes || null,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating deletion request:', updateError)
      return NextResponse.json(
        { error: 'Failed to update deletion request' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: `Deletion request ${status}` },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error processing deletion request:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
