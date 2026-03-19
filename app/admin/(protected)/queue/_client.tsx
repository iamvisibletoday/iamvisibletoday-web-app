'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Submission, SubmissionStatus } from '@/types/database'
import SubmissionCard from '@/components/admin/SubmissionCard'
import SubmissionFilters from '@/components/admin/SubmissionFilters'

export default function QueueClient({
  initialSubmissions,
  initialHasMore,
  initialStatus,
}: {
  initialSubmissions: Submission[]
  initialHasMore: boolean
  initialStatus: SubmissionStatus
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [status, setStatus] = useState<SubmissionStatus>(initialStatus)

  // Fetch new data when status changes
  useEffect(() => {
    const currentStatus = (searchParams.get('status') as SubmissionStatus) || 'pending'

    if (currentStatus !== status) {
      fetch(`/api/admin/submissions?status=${currentStatus}&limit=20`)
        .then((res) => res.json())
        .then(({ submissions: newSubmissions }) => {
          setSubmissions(newSubmissions)
          setStatus(currentStatus)
        })
        .catch(() => {
          // Error fetching, keep current state
        })
    }
  }, [searchParams, status])

  const handleStatusChange = (newStatus: SubmissionStatus) => {
    router.push(`/admin/queue?status=${newStatus}`)
  }

  const handleActionComplete = (submissionId: string) => {
    // Remove from list after action
    setSubmissions((prev) => prev.filter((s) => s.id !== submissionId))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-2">
          Moderation Queue
        </h1>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          Review and moderate submissions
        </p>
      </div>

      <SubmissionFilters currentStatus={status} onStatusChange={handleStatusChange} />

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <p className="text-center text-text-secondary dark:text-dark-text-secondary py-12">
            No {status} submissions found
          </p>
        ) : (
          submissions.map((submission, idx) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <SubmissionCard
                submission={submission}
                onActionComplete={handleActionComplete}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
