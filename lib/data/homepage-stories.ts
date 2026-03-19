import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export interface HomeStory {
  id: string
  slug: string
  title: string
  text_content?: string
  content_type: 'text' | 'photo' | 'voice' | 'combined'
  author_name?: string
}

/**
 * Fetch featured stories for the homepage carousel and grid
 * Returns most recent published stories, excluding soft-deleted ones
 */
export async function getHomepageStories(limit: number = 12) {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const { data, error } = await supabase
      .from('stories')
      .select('id, slug, title, text_content, content_type, author_name')
      .is('deleted_at', null) // Exclude soft-deleted stories
      .order('published_date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching homepage stories:', error)
      return []
    }

    return (data || []) as HomeStory[]
  } catch (err) {
    console.error('Error in getHomepageStories:', err)
    return []
  }
}

/**
 * Get a few featured stories for the hero carousel
 */
export async function getFeaturedStories(limit: number = 5) {
  return getHomepageStories(limit)
}
