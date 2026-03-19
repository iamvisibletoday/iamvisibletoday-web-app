import { createAdminClient } from '@/lib/supabase/admin'
import { deleteStorageFile } from '@/lib/supabase/storage'

/**
 * Soft delete a story (hide from public, keep in database)
 * Also removes associated submission record
 * Admin can still see soft-deleted stories and restore them if needed
 */
export async function softDeleteStory(
  slug: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  try {
    // Delete from submissions table (removes it from queue)
    await supabase.from('submissions').delete().eq('story_slug', slug)

    // Soft delete story (hide from public)
    const { error } = await supabase
      .from('stories')
      .update({
        deleted_at: new Date().toISOString(),
        deletion_reason: reason,
      })
      .eq('slug', slug)

    if (error) {
      console.error('Error soft-deleting story:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Error in softDeleteStory:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

/**
 * Hard delete a story (permanently remove from database and storage)
 * This is irreversible and should be used with caution
 * Also removes associated submission, deletion request records, and media files
 */
export async function hardDeleteStory(
  slug: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  try {
    // 1. Get story to find associated media files
    const { data: story, error: fetchError } = await supabase
      .from('stories')
      .select('photo_url, voice_url')
      .eq('slug', slug)
      .single()

    if (fetchError) {
      console.error('Error fetching story:', fetchError)
      return { success: false, error: fetchError.message }
    }

    // 2. Delete media files from storage
    if (story?.photo_url) {
      await deleteStorageFile('photos', story.photo_url)
    }
    if (story?.voice_url) {
      await deleteStorageFile('voice-notes', story.voice_url)
    }

    // 3. Delete from deletion_requests table
    await supabase.from('deletion_requests').delete().eq('story_slug', slug)

    // 4. Delete from submissions table
    await supabase.from('submissions').delete().eq('story_slug', slug)

    // 5. Delete from stories table
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('slug', slug)

    if (error) {
      console.error('Error hard-deleting story:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Error in hardDeleteStory:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

/**
 * Restore a soft-deleted story (make it visible again)
 */
export async function restoreStory(
  slug: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('stories')
    .update({
      deleted_at: null,
      deletion_reason: null,
    })
    .eq('slug', slug)

  if (error) {
    console.error('Error restoring story:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
