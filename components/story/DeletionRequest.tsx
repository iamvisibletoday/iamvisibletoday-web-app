'use client'

import { useState } from 'react'
import { AlertCircle, Flag } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const DELETION_REASONS = [
  { value: 'personal-request', label: 'I want my story removed' },
  { value: 'privacy-concern', label: 'Privacy concern' },
  { value: 'inappropriate-content', label: 'Inappropriate content' },
  { value: 'misinformation', label: 'Contains misinformation' },
  { value: 'other', label: 'Other' },
]

interface DeletionRequestProps {
  slug: string
  title: string
}

export default function DeletionRequest({ slug, title }: DeletionRequestProps) {
  const [showForm, setShowForm] = useState(false)
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason) {
      setError('Please select a reason')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/stories/deletion-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          reason,
          details: details || undefined,
          requesterEmail: localStorage.getItem('deletion_requester_email') || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit deletion request')
      }

      setSubmitted(true)
      setReason('')
      setDetails('')
      setTimeout(() => {
        setShowForm(false)
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (!showForm) {
    return (
      <div className="flex justify-center">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Flag className="w-4 h-4" />
          <span>Report or Request Deletion</span>
        </Button>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
            <Flag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary">
              Report or Request Deletion
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
              Help us improve by reporting issues
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              ✓ Thank you! Your request has been submitted to our moderation team.
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              We'll review it and respond within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Reason Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Reason *
              </label>
              <select
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  setError('')
                }}
                className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="">Select a reason...</option>
                {DELETION_REASONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Additional Details (optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Please provide any additional context..."
                maxLength={500}
                className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
                rows={3}
              />
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                {details.length}/500
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Info */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Our moderation team will review your request and respond to you. All reports are treated confidentially.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  )
}
