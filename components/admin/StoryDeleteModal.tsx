'use client'

import { useState } from 'react'
import { AlertCircle, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface StoryDeleteModalProps {
  slug: string
  title: string
  onClose: () => void
  onDeleteComplete: () => void
}

export default function StoryDeleteModal({
  slug,
  title,
  onClose,
  onDeleteComplete,
}: StoryDeleteModalProps) {
  const [deleteType, setDeleteType] = useState<'soft' | 'hard'>('soft')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    if (deleteType === 'soft' && !reason.trim()) {
      setError('Reason is required for soft delete')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/stories/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          deletionType: deleteType,
          reason: reason || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete story')
      }

      onDeleteComplete()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="font-display text-lg text-text-primary dark:text-dark-text-primary">
                Delete Story
              </h2>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                {title}
              </p>
            </div>
          </div>

          {/* Delete Type Selection */}
          <div className="space-y-3 py-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="deleteType"
                value="soft"
                checked={deleteType === 'soft'}
                onChange={(e) => {
                  setDeleteType(e.target.value as 'soft' | 'hard')
                  setError('')
                }}
                className="mt-1 w-4 h-4"
              />
              <div>
                <p className="font-medium text-text-primary dark:text-dark-text-primary">
                  Soft Delete (Hide)
                </p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                  Hides from public view but preserves in database (GDPR compliant)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="deleteType"
                value="hard"
                checked={deleteType === 'hard'}
                onChange={(e) => {
                  setDeleteType(e.target.value as 'soft' | 'hard')
                  setError('')
                }}
                className="mt-1 w-4 h-4"
              />
              <div>
                <p className="font-medium text-text-primary dark:text-dark-text-primary">
                  Hard Delete (Remove)
                </p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                  Permanently removes from database (cannot be undone)
                </p>
              </div>
            </label>
          </div>

          {/* Reason Input */}
          {deleteType === 'soft' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Reason for Deletion *
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  setError('')
                }}
                placeholder="e.g., User request, Violation of guidelines, etc."
                className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                {reason.length}/200
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Warning */}
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              {deleteType === 'soft'
                ? 'The story will be hidden from public view but can be restored if needed.'
                : '⚠️ This action cannot be undone. The story will be permanently removed.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-rose-100 dark:border-dark-bg-tertiary">
            <Button
              variant="primary"
              size="sm"
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {loading ? 'Deleting...' : `${deleteType === 'soft' ? 'Hide' : 'Delete'} Story`}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
