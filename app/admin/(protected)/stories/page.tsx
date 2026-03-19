import { Metadata } from 'next'
import StoriesClient from './_client'

export const metadata: Metadata = {
  title: 'Stories Management - Admin Dashboard',
  description: 'Manage and moderate stories in the archive',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StoriesPage() {
  return <StoriesClient />
}
