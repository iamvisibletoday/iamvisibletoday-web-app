'use client'

import { SubmissionStatus } from '@/types/database'

export default function SubmissionFilters({
  currentStatus,
  onStatusChange,
}: {
  currentStatus: SubmissionStatus
  onStatusChange: (status: SubmissionStatus) => void
}) {
  const statuses: { value: SubmissionStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ]

  return (
    <div className="flex gap-2">
      {statuses.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onStatusChange(value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentStatus === value
              ? 'bg-rose-500 dark:bg-rose-600 text-white'
              : 'bg-white dark:bg-dark-bg-tertiary text-text-secondary dark:text-dark-text-secondary hover:text-rose-600 dark:hover:text-rose-400 border border-rose-100 dark:border-dark-bg-tertiary'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
