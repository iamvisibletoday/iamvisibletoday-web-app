import { supabase } from '@/lib/supabase/client'
import { Story, StoryLink, StoryFilters, PaginationParams } from '@/types/database'
import { mockStories } from './mock-stories'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

export async function getStories(
  filters: StoryFilters = {},
  pagination: PaginationParams = { limit: 12 }
): Promise<{ stories: Story[]; hasMore: boolean }> {
  if (USE_MOCK) {
    let filtered = [...mockStories]

    if (filters.contentType) {
      filtered = filtered.filter((s) => s.content_type === filters.contentType)
    }
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(search) ||
          s.text_content?.toLowerCase().includes(search) ||
          s.photo_caption?.toLowerCase().includes(search)
      )
    }

    // Sort by published_date descending
    filtered.sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    )

    const start = pagination.cursor
      ? filtered.findIndex((s) => s.published_date < pagination.cursor!) + 0
      : 0
    const stories = filtered.slice(
      start === -1 ? 0 : start,
      (start === -1 ? 0 : start) + pagination.limit
    )

    return {
      stories,
      hasMore: (start === -1 ? 0 : start) + pagination.limit < filtered.length,
    }
  }

  const client = supabase
  let query = client
    .from('stories')
    .select('*')
    .is('deleted_at', null)
    .order('published_date', { ascending: false })
    .limit(pagination.limit + 1)

  if (filters.contentType) {
    query = query.eq('content_type', filters.contentType)
  }

  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,text_content.ilike.%${filters.search}%`
    )
  }

  if (pagination.cursor) {
    query = query.lt('published_date', pagination.cursor)
  }

  const { data, error } = await query

  if (error) throw error

  const hasMore = (data?.length || 0) > pagination.limit
  const stories = hasMore ? data!.slice(0, -1) : (data ?? [])

  return { stories, hasMore }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  if (USE_MOCK) {
    return mockStories.find((s) => s.slug === slug) || null
  }

  const client = supabase
  const { data, error } = await client
    .from('stories')
    .select('*')
    .eq('slug', slug)
    .is('deleted_at', null)
    .single()

  if (error) return null
  return data
}

export async function incrementViewCount(slug: string): Promise<void> {
  if (USE_MOCK) return
  await supabase.rpc('increment_view_count', { story_slug: slug })
}

export async function incrementRelateCount(slug: string): Promise<void> {
  if (USE_MOCK) return
  await supabase.rpc('increment_relate_count', { story_slug: slug })
}

export async function getAdjacentStories(
  currentDate: string
): Promise<{ previous: StoryLink | null; next: StoryLink | null }> {
  if (USE_MOCK) {
    const sorted = [...mockStories].sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    )
    const index = sorted.findIndex((s) => s.published_date === currentDate)
    return {
      previous: index > 0 ? sorted[index - 1] : null,
      next: index < sorted.length - 1 ? sorted[index + 1] : null,
    }
  }

  const client = supabase

  const [prevResult, nextResult] = await Promise.all([
    client
      .from('stories')
      .select('id, slug, title')
      .is('deleted_at', null)
      .gt('published_date', currentDate)
      .order('published_date', { ascending: true })
      .limit(1)
      .single(),
    client
      .from('stories')
      .select('id, slug, title')
      .is('deleted_at', null)
      .lt('published_date', currentDate)
      .order('published_date', { ascending: false })
      .limit(1)
      .single(),
  ])

  return {
    previous: prevResult.data || null,
    next: nextResult.data || null,
  }
}
