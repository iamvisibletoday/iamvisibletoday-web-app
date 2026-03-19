'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, List, LogOut, Trash2, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/queue', label: 'Queue', icon: List },
    { href: '/admin/stories', label: 'Stories', icon: BookOpen },
    { href: '/admin/deletions', label: 'Deletions', icon: Trash2 },
  ]

  return (
    <nav className="bg-white dark:bg-dark-bg-tertiary border-b border-rose-100 dark:border-dark-bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-xl text-rose-600 dark:text-rose-400">
              Admin
            </Link>
            <div className="flex gap-2">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === href
                      ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:text-rose-600 dark:hover:text-rose-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
