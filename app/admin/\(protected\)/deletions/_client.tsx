'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Check, X, Clock } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface DeletionRequest {
  id: string
  story_slug: string
  story_title: string
  reason: string
  details: string | null
  requester_email: string | null
  requested_at: string
  status: 'pending' | 'approved' | 'rejected' | 'resolved'
  admin_notes: string | null
}

const REASON_LABELS: Record<string, string> = {
  'personal-request': 'Personal Request',
  'privacy-concern': 'Privacy Concern',
  'inappropriate-content': 'Inappropriate Content',
  'misinformation': 'Misinformation',
  'other': 'Other',
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

export default function DeletionRequestsClient() {
  const [requests, setRequests] = useState<DeletionRequest[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('pending')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRequests()
  }, [filter])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/deletion-requests?status=${filter}`)
      if (!response.ok) throw new Error('Failed to fetch deletion requests')

      const data = await response.json()
      setRequests(data.requests || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (requestId: string) => {
    try {
      const response = await fetch('/api/admin/deletion-requests/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      })

      if (!response.ok) throw new Error('Failed to approve deletion request')

      setRequests((prev) => prev.filter((r) => r.id !== requestId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      const response = await fetch('/api/admin/deletion-requests/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      })

      if (!response.ok) throw new Error('Failed to reject deletion request')

      setRequests((prev) => prev.filter((r) => r.id !== requestId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-2">
            Deletion Requests
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Review and manage user deletion requests
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'pending', 'resolved'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {requests.length > 0 && ` (${requests.length})`}
            </Button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Requests List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Loading deletion requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Trash2 className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-text-secondary dark:text-dark-text-secondary">
                No {filter === 'all' ? '' : filter} deletion requests found
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request, idx) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Card hover>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-1">
                          {request.story_title || 'Untitled Story'}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeDate(request.requested_at)}
                          </div>
                          <span className="px-2 py-1 bg-slate-100 dark:bg-dark-bg-tertiary rounded text-xs font-medium">
                            {REASON_LABELS[request.reason] || request.reason}
                          </span>
                          {request.requester_email && (
                            <span className="text-xs">{request.requester_email}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Story Slug */}
                    <div className="text-sm">
                      <p className="text-text-secondary dark:text-dark-text-secondary">
                        Story: <code className="text-xs bg-slate-100 dark:bg-dark-bg-tertiary px-2 py-1 rounded">{request.story_slug}</code>
                      </p>
                    </div>

                    {/* Details */}
                    {request.details && (
                      <div className="p-3 bg-slate-50 dark:bg-dark-bg-secondary rounded-lg">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                          User Details:
                        </p>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary whitespace-pre-wrap">
                          {request.details}
                        </p>
                      </div>
                    )}

                    {/* Admin Notes */}
                    {request.admin_notes && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                          Admin Notes:
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {request.admin_notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    {request.status === 'pending' && (
                      <div className="flex gap-2 pt-3 border-t border-rose-100 dark:border-dark-bg-tertiary">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Approve Deletion
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleReject(request.id)}
                          className="flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    )}

                    {/* Status Badge */}
                    {request.status !== 'pending' && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-text-secondary dark:text-dark-text-secondary">
                          Status:
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            request.status === 'resolved'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                              : request.status === 'approved'
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}
