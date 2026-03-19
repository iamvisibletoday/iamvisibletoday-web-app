import type { Metadata } from 'next'
import PrivacyPageClient from './_client'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'I Am Visible Today™ Privacy Policy. GDPR, CCPA, COPPA, and PIPEDA compliant. We never sell data, track users, or use content for AI training.',
  keywords: [
    'privacy policy',
    'GDPR compliance',
    'CCPA compliance',
    'data protection',
    'mental health privacy',
  ],
  openGraph: {
    title: 'Privacy Policy - I Am Visible Today™',
    description: 'Privacy-first approach. We never sell data or use content for AI training.',
    url: 'https://iamvisibletoday.com/privacy',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - I Am Visible Today™',
    description: 'Privacy-first approach. We never sell data.',
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
