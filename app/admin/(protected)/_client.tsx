'use client'

import { motion } from 'framer-motion'
import { FileText, Check, X, Clock } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function DashboardClient({
  stats,
}: {
  stats: { pending: number; approved: number; rejected: number }
}) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-2">
          Admin Dashboard
        </h1>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          Manage submissions and moderate content
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="font-display text-lg text-text-primary dark:text-dark-text-primary">
                Pending Review
              </h2>
            </div>
            <p className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              {stats.pending}
            </p>
            <Link href="/admin/queue?status=pending">
              <Button variant="secondary" size="sm" className="w-full">
                Review Queue
              </Button>
            </Link>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="font-display text-lg text-text-primary dark:text-dark-text-primary">
                Approved
              </h2>
            </div>
            <p className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              {stats.approved}
            </p>
            <Link href="/admin/queue?status=approved">
              <Button variant="secondary" size="sm" className="w-full">
                View Approved
              </Button>
            </Link>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <X className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="font-display text-lg text-text-primary dark:text-dark-text-primary">
                Rejected
              </h2>
            </div>
            <p className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              {stats.rejected}
            </p>
            <Link href="/admin/queue?status=rejected">
              <Button variant="secondary" size="sm" className="w-full">
                View Rejected
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
