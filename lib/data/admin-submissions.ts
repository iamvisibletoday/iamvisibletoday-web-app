import { randomUUID } from 'node:crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { Submission, SubmissionStatus } from '@/types/database'

interface PaginationParams {
  limit?: number
  cursor?: string
}

// All functions use admin client (service role key) to bypass RLS
// This is necessary because submissions table has RLS enabled
export async function getSubmissions(
  status: SubmissionStatus | 'all' = 'pending',
  pagination: PaginationParams = { limit: 20 }
): Promise<{ submissions: Submission[]; hasMore: boolean }> {
  const supabase = createAdminClient()

  let query = supabase
    .from('submissions')
    .select('*')
    .order('submitted_at', { ascending: false })
    .limit((pagination.limit || 20) + 1)

  if (status !== 'all') {
    query = query.eq('status', status)
  }

  if (pagination.cursor) {
    query = query.lt('submitted_at', pagination.cursor)
  }

  let { data, error } = await query
  if (error) throw error

  // If submissions have story_slug, filter out those with deleted stories
  if (data && data.length > 0) {
    const submissionsWithStories = data.filter((s) => s.story_slug)
    if (submissionsWithStories.length > 0) {
      // Check which stories are deleted
      const slugs = submissionsWithStories.map((s) => s.story_slug)
      const { data: stories, error: storiesError } = await supabase
        .from('stories')
        .select('slug, deleted_at')
        .in('slug', slugs)

      if (!storiesError && stories) {
        const deletedSlugs = new Set(
          stories.filter((s) => s.deleted_at).map((s) => s.slug)
        )
        // Filter out submissions with deleted stories
        data = data.filter((s) => !deletedSlugs.has(s.story_slug))
      }
    }
  }

  const limit = pagination.limit || 20
  const hasMore = (data?.length || 0) > limit
  const submissions = hasMore ? data!.slice(0, -1) : (data ?? [])
  return { submissions, hasMore }
}

export async function getSubmissionById(id: string): Promise<Submission | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  moderatorNotes?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('submissions')
    .update({
      status,
      moderator_notes: moderatorNotes,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function approveSubmission(
  id: string,
  moderatorNotes?: string
): Promise<{ success: boolean; storyId?: string; error?: string }> {
  const supabase = createAdminClient()

  // 1. Get submission
  const submission = await getSubmissionById(id)
  if (!submission) return { success: false, error: 'Submission not found' }

  // 2. Use user-provided title if available, otherwise extract from content
  const title = submission.title?.trim() || extractTitle(submission)
  const slug = generateSlug(title)

  // 3. Create story from submission
  const { data: story, error: storyError } = await supabase
    .from('stories')
    .insert([
      {
        slug,
        title,
        text_content: submission.text_content,
        photo_caption: submission.photo_caption,
        photo_url: submission.photo_url,
        voice_url: submission.voice_url,
        content_type: determineContentType(submission),
        author_name: submission.author_name,
        has_content_warning: false, // Admin can manually add CW later
        warning_text: null,
        published_date: new Date().toISOString(),
        meta_description: generateMetaDescription(submission),
      },
    ])
    .select()
    .single()

  if (storyError) return { success: false, error: storyError.message }

  // 4. Update submission status
  await updateSubmissionStatus(id, 'approved', moderatorNotes)

  return { success: true, storyId: story.id }
}

export async function getSubmissionStats(): Promise<{
  pending: number
  approved: number
  rejected: number
}> {
  const supabase = createAdminClient()

  const [pending, approved, rejected] = await Promise.all([
    supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'approved'),
    supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'rejected'),
  ])

  return {
    pending: pending.count || 0,
    approved: approved.count || 0,
    rejected: rejected.count || 0,
  }
}

// Helper functions
function extractTitle(submission: Submission): string {
  if (submission.text_content) {
    // Use first sentence as title, max 60 chars
    const firstLine = submission.text_content.split('\n')[0]
    return firstLine.substring(0, 60).trim()
  }
  if (submission.photo_caption) {
    return submission.photo_caption.substring(0, 60).trim()
  }
  return 'Untitled Story'
}

function generateSlug(title: string): string {
  // Generate UUID-based slug for guaranteed uniqueness
  // Pattern: {uuid}-{sanitized-title}
  // Example: a1b2c3d4-e5f6-4789-abcd-ef0123456789-healing-journey
  const uuid = randomUUID()

  const sanitizedTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50) // Shorter title portion to keep URL reasonable

  return `${uuid}-${sanitizedTitle}`.replace(/-+$/, '') // Remove trailing dashes
}

function determineContentType(submission: Submission): string {
  const hasText = !!submission.text_content
  const hasPhoto = submission.has_photo
  const hasVoice = submission.has_voice

  // Count formats: any 2+ formats = 'combined'
  const formatCount = Number(hasText) + Number(hasPhoto) + Number(hasVoice)

  if (formatCount >= 2) return 'combined'
  if (hasPhoto) return 'photo'
  if (hasVoice) return 'voice'
  return 'text'
}

function generateMetaDescription(submission: Submission): string {
  const text = submission.text_content || submission.photo_caption || ''
  return text.substring(0, 160).trim()
}
