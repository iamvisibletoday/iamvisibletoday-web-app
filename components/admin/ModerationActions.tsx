'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ModerationActions({
  submissionId,
  onComplete,
}: {
  submissionId: string
  onComplete: () => void
}) {
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState<'approve' | 'reject' | null>(null)

  const handleAction = async (actionType: 'approve' | 'reject') => {
    setLoading(true)
    const response = await fetch('/api/admin/submissions/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: submissionId,
        action: actionType,
        moderatorNotes: notes,
      }),
    })

    if (response.ok) {
      onComplete()
    }
    setLoading(false)
  }

  if (action) {
    return (
      <div className="space-y-3 pt-3 border-t border-rose-100 dark:border-dark-bg-tertiary">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add moderator notes (optional)"
          className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
          rows={3}
        />
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleAction(action)}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Confirm ${action === 'approve' ? 'Approve' : 'Reject'}`}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setAction(null)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2 pt-3 border-t border-rose-100 dark:border-dark-bg-tertiary">
      <Button variant="primary" size="sm" onClick={() => setAction('approve')}>
        <Check className="w-4 h-4 mr-1" />
        Approve
      </Button>
      <Button variant="secondary" size="sm" onClick={() => setAction('reject')}>
        <X className="w-4 h-4 mr-1" />
        Reject
      </Button>
    </div>
  )
}
