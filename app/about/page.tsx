import type { Metadata } from 'next'
import AboutPageClient from './_client'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about I Am Visible Today™ - our mission to create a safe, privacy-first space for anonymous mental health stories. Human-curated, ad-free, community-driven.',
  openGraph: {
    title: 'About I Am Visible Today™',
    description: 'Our mission: create a safe space for mental health stories without ads, algorithms, or tracking.',
    url: 'https://iamvisibletoday.com/about',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About I Am Visible Today™',
    description: 'Our mission: create a safe space for mental health stories.',
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
