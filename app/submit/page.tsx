import { Metadata } from 'next'
import SubmitPageClient from './_client'

export const metadata: Metadata = {
  title: 'Share Your Story',
  description: 'Share your mental health story anonymously. Text, photo, or voice. Safe, private, human-reviewed. Your story matters.',
  keywords: [
    'share mental health story',
    'anonymous submission',
    'mental health writing',
    'depression story submission',
    'safe space to share',
  ],
  openGraph: {
    title: 'Share Your Story - I Am Visible Today™',
    description: 'Share your mental health story anonymously. Text, photo, or voice.',
    url: 'https://iamvisibletoday.com/submit',
    siteName: 'I Am Visible Today',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Share Your Story - I Am Visible Today™',
    description: 'Share your mental health story anonymously.',
  },
}

export default function SubmitPage() {
  return <SubmitPageClient />
}
