import type { Metadata } from 'next'
import ContactPageClient from './_client'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with I Am Visible Today™. Report content, privacy requests, legal inquiries, or feedback. Mental health crisis resources available.',
  keywords: [
    'contact mental health platform',
    'report content',
    'privacy request',
    'mental health support contact',
  ],
  openGraph: {
    title: 'Contact I Am Visible Today™',
    description: 'Get in touch for support, privacy requests, or feedback.',
    url: 'https://iamvisibletoday.com/contact',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact I Am Visible Today™',
    description: 'Get in touch for support, privacy requests, or feedback.',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
