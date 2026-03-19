import type { Metadata } from 'next'
import TermsPageClient from './_client'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'I Am Visible Today™ Terms of Service. User rights, content protection, anti-scraping policy, and our non-commercial guarantee.',
  openGraph: {
    title: 'Terms of Service - I Am Visible Today™',
    description: 'User rights, content protection, and our non-commercial guarantee.',
    url: 'https://iamvisibletoday.com/terms',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - I Am Visible Today™',
    description: 'User rights and content protection.',
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
