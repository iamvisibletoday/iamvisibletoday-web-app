'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, CheckCircle, XCircle, Clock, AlertCircle, Loader } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/format'
import DeletionRequestModal from '@/components/admin/DeletionRequestModal'

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
  reviewed_at: string | null
}

export default function DeletionRequestsClient() {
  const [requests, setRequests] = useState<DeletionRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<DeletionRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [approvalModal, setApprovalModal] = useState<{
    isOpen: boolean
    request: DeletionRequest | null
  }>({ isOpen: false, request: null })

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch('/api/admin/deletion-requests?status=all')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch deletion requests')
      }

      setRequests(data.requests || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setRequests([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(requests)
    } else {
      setFilteredRequests(requests.filter((r) => r.status === statusFilter))
    }
  }, [requests, statusFilter])

  const handleApprove = async (
    id: string,
    deletionType: 'soft' | 'hard',
    adminNotes?: string
  ) => {
    try {
      setProcessingId(id)
      const response = await fetch(`/api/admin/deletion-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved', adminNotes, deletionType }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to approve request')
      }

      // Refresh the list
      await fetchRequests()
      setApprovalModal({ isOpen: false, request: null })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (id: string, adminNotes?: string) => {
    try {
      setProcessingId(id)
      const response = await fetch(`/api/admin/deletion-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', adminNotes }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to reject request')
      }

      // Refresh the list
      await fetchRequests()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-amber-600 dark:text-amber-400'
      case 'approved':
        return 'text-green-600 dark:text-green-400'
      case 'rejected':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <Container>
      <div className="space-y-6">
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

        {error && (
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </Card>
        )}

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-100 dark:bg-dark-bg-tertiary text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-dark-bg-secondary'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <Card>
            <div className="flex items-center justify-center py-12 gap-2">
              <Loader className="w-5 h-5 animate-spin text-rose-500" />
              <p className="text-text-secondary dark:text-dark-text-secondary">Loading deletion requests...</p>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!loading && filteredRequests.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Trash2 className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-text-secondary dark:text-dark-text-secondary">
                {statusFilter === 'all' && requests.length === 0
                  ? 'No deletion requests yet'
                  : `No ${statusFilter} deletion requests`}
              </p>
            </div>
          </Card>
        )}

        {/* Deletion Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                        {request.story_title}
                      </h3>
                      <span className={`flex items-center gap-1 text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Story: <code className="text-xs">{request.story_slug}</code>
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid gap-2 text-sm">
                  <div>
                    <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">Reason</p>
                    <p className="text-text-primary dark:text-dark-text-primary">
                      {request.reason.replaceAll('-', ' ').charAt(0).toUpperCase() + request.reason.slice(1).replaceAll('-', ' ')}
                    </p>
                  </div>

                  {request.details && (
                    <div>
                      <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">Details</p>
                      <p className="text-text-primary dark:text-dark-text-primary">{request.details}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">Requested</p>
                      <p className="text-text-primary dark:text-dark-text-primary">{formatDate(request.requested_at)}</p>
                    </div>
                    {request.requester_email && (
                      <div>
                        <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">Email</p>
                        <p className="text-text-primary dark:text-dark-text-primary text-sm break-all">{request.requester_email}</p>
                      </div>
                    )}
                  </div>

                  {request.admin_notes && (
                    <div className="bg-slate-50 dark:bg-dark-bg-tertiary p-3 rounded">
                      <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase mb-1">Admin Notes</p>
                      <p className="text-text-primary dark:text-dark-text-primary text-sm">{request.admin_notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {request.status === 'pending' && (
                  <div className="flex gap-2 pt-2 border-t border-rose-100 dark:border-dark-bg-tertiary">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        setApprovalModal({ isOpen: true, request })
                      }
                      disabled={processingId === request.id}
                      className="flex-1"
                    >
                      {processingId === request.id ? 'Processing...' : 'Approve & Delete'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleReject(request.id)}
                      disabled={processingId === request.id}
                      className="flex-1"
                    >
                      {processingId === request.id ? 'Processing...' : 'Reject'}
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Approval Modal */}
      {approvalModal.isOpen && approvalModal.request && (
        <DeletionRequestModal
          request={approvalModal.request}
          onApprove={handleApprove}
          onClose={() => setApprovalModal({ isOpen: false, request: null })}
          isProcessing={processingId === approvalModal.request.id}
        />
      )}
    </Container>
  )
}
