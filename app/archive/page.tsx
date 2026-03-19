import { Metadata } from 'next'
import { getStories } from '@/lib/data/stories'
import { ContentType } from '@/types/database'
import ArchivePageClient from './_client'

export const metadata: Metadata = {
  title: 'Story Archive',
  description: 'Browse anonymous mental health stories. Filter by format (text, photo, voice). Human-curated moments of visibility, depression journeys, and recovery stories.',
  keywords: [
    'mental health stories',
    'depression stories',
    'anxiety experiences',
    'recovery stories',
    'mental health archive',
    'anonymous stories',
  ],
  openGraph: {
    title: 'Story Archive - I Am Visible Today™',
    description: 'Browse anonymous mental health stories from our community.',
    url: 'https://iamvisibletoday.com/archive',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Story Archive - I Am Visible Today™',
    description: 'Browse anonymous mental health stories from our community.',
  },
}

interface PageProps {
  searchParams: Promise<{
    search?: string
    type?: ContentType
  }>
}

export default async function ArchivePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const initialData = await getStories(
    {
      search: resolvedParams.search,
      contentType: resolvedParams.type,
    },
    { limit: 12 }
  )

  return (
    <ArchivePageClient
      initialStories={initialData.stories}
      initialHasMore={initialData.hasMore}
      initialFilters={{
        search: resolvedParams.search,
        contentType: resolvedParams.type,
      }}
    />
  )
}
