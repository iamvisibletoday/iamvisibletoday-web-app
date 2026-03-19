import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // Get authenticated user from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if user exists and has admin role
  if (!user || user.user_metadata?.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg-primary">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
