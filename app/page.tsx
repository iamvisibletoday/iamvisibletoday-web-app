import type { Metadata } from 'next'
import HomePageClient from '@/components/home/HomePageClient'
import { getFeaturedStories } from '@/lib/data/homepage-stories'

export const metadata: Metadata = {
  title: 'Anonymous Mental Health Stories',
  description: 'Share your mental health journey anonymously. A safe, human-curated space for depression stories, anxiety experiences, and moments of visibility. No ads, no algorithms.',
  keywords: [
    'mental health stories',
    'anonymous sharing',
    'depression support',
    'anxiety stories',
    'mental health community',
    'safe space mental health',
    'visibility moments',
    'human connection',
  ],
  openGraph: {
    title: 'I Am Visible Today™ - Anonymous Mental Health Stories',
    description: 'A safe space to share your mental health story anonymously. Human-curated, ad-free, privacy-first.',
    url: 'https://iamvisibletoday.com',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I Am Visible Today™ - Anonymous Mental Health Stories',
    description: 'A safe space to share your mental health story anonymously.',
  },
}

export default async function HomePage() {
  const featuredStories = await getFeaturedStories(5)
  return <HomePageClient featuredStories={featuredStories} />
}