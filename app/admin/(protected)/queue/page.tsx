import { Metadata } from 'next'
import { getSubmissions } from '@/lib/data/admin-submissions'
import { SubmissionStatus } from '@/types/database'
import QueueClient from './_client'

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

export const metadata: Metadata = {
  title: 'Moderation Queue - Admin - I Am Visible Today',
  robots: { index: false, follow: false },
}

export default async function QueuePage({ searchParams }: PageProps) {
  const params = await searchParams
  const status = (params.status as SubmissionStatus) || 'pending'

  const { submissions, hasMore } = await getSubmissions(status, { limit: 20 })

  return <QueueClient initialSubmissions={submissions} initialHasMore={hasMore} initialStatus={status} />
}
