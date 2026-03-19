import { SubmissionStatus } from '@/types/database'
import { Clock, Check, X } from 'lucide-react'

export default function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const variants = {
    pending: {
      bg: 'bg-amber-100 dark:bg-amber-900/20',
      text: 'text-amber-700 dark:text-amber-400',
      icon: Clock,
    },
    approved: {
      bg: 'bg-green-100 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
      icon: Check,
    },
    rejected: { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', icon: X },
  }

  const { bg, text, icon: Icon } = variants[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${bg} ${text}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
