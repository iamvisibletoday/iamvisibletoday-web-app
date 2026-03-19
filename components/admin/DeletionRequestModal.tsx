'use client'

import { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface DeletionRequest {
  id: string
  story_slug: string
  story_title: string
  reason: string
  details: string | null
}

interface DeletionRequestModalProps {
  request: DeletionRequest
  onApprove: (
    id: string,
    deletionType: 'soft' | 'hard',
    adminNotes?: string
  ) => Promise<void>
  onClose: () => void
  isProcessing: boolean
}

export default function DeletionRequestModal({
  request,
  onApprove,
  onClose,
  isProcessing,
}: DeletionRequestModalProps) {
  const [deletionType, setDeletionType] = useState<'soft' | 'hard'>('soft')
  const [adminNotes, setAdminNotes] = useState('')
  const [error, setError] = useState('')

  const handleApprove = async () => {
    try {
      setError('')
      await onApprove(request.id, deletionType, adminNotes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-text-primary dark:text-dark-text-primary text-lg">
                Approve Deletion Request
              </h2>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                {request.story_title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Request Details */}
        <div className="bg-slate-50 dark:bg-dark-bg-tertiary p-4 rounded-lg space-y-2">
          <div>
            <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">
              Reason
            </p>
            <p className="text-sm text-text-primary dark:text-dark-text-primary">
              {request.reason.replaceAll('-', ' ').charAt(0).toUpperCase() +
                request.reason.slice(1).replaceAll('-', ' ')}
            </p>
          </div>
          {request.details && (
            <div>
              <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">
                Details
              </p>
              <p className="text-sm text-text-primary dark:text-dark-text-primary">
                {request.details}
              </p>
            </div>
          )}
        </div>

        {/* Deletion Type Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            Deletion Type
          </p>

          <label
            className="flex items-start gap-3 p-3 rounded-lg border-2 border-rose-200 dark:border-rose-900 cursor-pointer transition-colors"
            style={{
              borderColor: deletionType === 'soft' ? '#ec4899' : undefined,
              backgroundColor:
                deletionType === 'soft'
                  ? 'rgba(236, 72, 153, 0.05)'
                  : undefined,
            }}
          >
            <input
              type="radio"
              name="deletionType"
              value="soft"
              checked={deletionType === 'soft'}
              onChange={() => setDeletionType('soft')}
              disabled={isProcessing}
              className="mt-1 w-4 h-4 text-rose-500 focus:ring-rose-500"
            />
            <div className="flex-1">
              <p className="font-medium text-text-primary dark:text-dark-text-primary">
                Soft Delete (Recommended)
              </p>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                Hides story from public view but preserves data. Reversible.
              </p>
            </div>
          </label>

          <label
            className="flex items-start gap-3 p-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
            style={{
              borderColor: deletionType === 'hard' ? '#f59e0b' : undefined,
              backgroundColor:
                deletionType === 'hard'
                  ? 'rgba(245, 158, 11, 0.05)'
                  : undefined,
            }}
          >
            <input
              type="radio"
              name="deletionType"
              value="hard"
              checked={deletionType === 'hard'}
              onChange={() => setDeletionType('hard')}
              disabled={isProcessing}
              className="mt-1 w-4 h-4 text-amber-500 focus:ring-amber-500"
            />
            <div className="flex-1">
              <p className="font-medium text-text-primary dark:text-dark-text-primary">
                Hard Delete
              </p>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                Permanently removes story from database. Irreversible.
              </p>
            </div>
          </label>
        </div>

        {/* Admin Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            Admin Notes (Optional)
          </label>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            disabled={isProcessing}
            placeholder="Add any internal notes about this deletion decision..."
            maxLength={300}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder-text-secondary dark:placeholder-dark-text-secondary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50"
          />
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
            {adminNotes.length}/300
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Warning for Hard Delete */}
        {deletionType === 'hard' && (
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <span className="font-semibold">⚠️ Warning:</span> Hard deletion is
              permanent and cannot be undone. This will permanently remove the
              story from the database.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-rose-100 dark:border-dark-bg-tertiary">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant={deletionType === 'hard' ? 'primary' : 'secondary'}
            onClick={handleApprove}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing
              ? 'Processing...'
              : `${deletionType === 'soft' ? 'Soft' : 'Hard'} Delete`}
          </Button>
        </div>
      </Card>
    </div>
  )
}
