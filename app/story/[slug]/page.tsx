import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getStoryBySlug, getAdjacentStories } from '@/lib/data/stories'
import { generateSessionToken, registerSessionToken } from '@/lib/media/session-tokens'
import StoryPageClient from './_client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const story = await getStoryBySlug(slug)

  if (!story) {
    return {
      title: 'Story Not Found - I Am Visible Today',
      description: 'This story could not be found.',
    }
  }

  return {
    title: `${story.title} - I Am Visible Today`,
    description:
      story.meta_description ||
      story.text_content?.substring(0, 160) ||
      'A story of visibility and courage.',
    robots: 'noindex, follow',
    openGraph: {
      title: story.title,
      description:
        story.meta_description || 'A story from I Am Visible Today',
      images: story.photo_url ? [{ url: story.photo_url }] : [],
    },
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params
  const story = await getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  const adjacentStories = await getAdjacentStories(story.published_date)

  // Generate a session token for this page view
  // Token allows viewing media on this page, but prevents direct URL access
  const sessionToken = generateSessionToken()
  registerSessionToken(sessionToken)

  return (
    <StoryPageClient
      story={story}
      adjacentStories={adjacentStories}
      sessionToken={sessionToken}
    />
  )
}
