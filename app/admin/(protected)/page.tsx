import { Metadata } from 'next'
import { getSubmissionStats } from '@/lib/data/admin-submissions'
import DashboardClient from './_client'

export const metadata: Metadata = {
  title: 'Admin Dashboard - I Am Visible Today',
  robots: { index: false, follow: false },
}

export default async function AdminDashboard() {
  const stats = await getSubmissionStats()
  return <DashboardClient stats={stats} />
}
