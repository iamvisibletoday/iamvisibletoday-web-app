import type { Metadata } from 'next'
import GuidelinesPageClient from './_client'

export const metadata: Metadata = {
  title: 'Community Guidelines',
  description: 'I Am Visible Today™ Community Guidelines. How we moderate content, what\'s allowed, and our commitment to safety while protecting mental health stories.',
  openGraph: {
    title: 'Community Guidelines - I Am Visible Today™',
    description: 'How we create a safe space for mental health storytelling.',
    url: 'https://iamvisibletoday.com/guidelines',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Community Guidelines - I Am Visible Today™',
    description: 'Creating a safe space for mental health storytelling.',
  },
}

export default function GuidelinesPage() {
  return <GuidelinesPageClient />
}
