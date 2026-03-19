'use client'

import { useState } from 'react'
import { FileText, Image, Mic, Calendar, User, Mail } from 'lucide-react'
import { Submission } from '@/types/database'
import Card from '@/components/ui/Card'
import SubmissionStatusBadge from './SubmissionStatusBadge'
import ModerationActions from './ModerationActions'
import DeleteStoryButton from './DeleteStoryButton'
import { useSecureMediaUrl } from '@/lib/hooks/useSecureMediaUrl'

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

function SubmissionPhotoDisplay({ path }: { path: string }) {
  const { url, loading, error } = useSecureMediaUrl('photos', path)

  if (loading) {
    return (
      <div className="max-w-md aspect-4/3 bg-slate-200 dark:bg-dark-bg-tertiary animate-pulse rounded-lg" />
    )
  }

  if (error || !url) {
    return (
      <div className="max-w-md aspect-4/3 bg-slate-100 dark:bg-dark-bg-tertiary rounded-lg flex items-center justify-center">
        <p className="text-xs text-slate-500">Image unavailable</p>
      </div>
    )
  }

  return <img src={url} alt="Submission" className="max-w-md rounded-lg" />
}

function SubmissionAudioDisplay({ path }: { path: string }) {
  const { url, loading, error } = useSecureMediaUrl('voice-notes', path)

  if (loading) {
    return (
      <div className="w-full h-10 bg-slate-200 dark:bg-dark-bg-tertiary animate-pulse rounded-lg" />
    )
  }

  if (error || !url) {
    return (
      <div className="w-full p-3 bg-slate-100 dark:bg-dark-bg-tertiary rounded-lg text-center">
        <p className="text-xs text-slate-500">Audio unavailable</p>
      </div>
    )
  }

  return <audio controls src={url} className="w-full" />
}

export default function SubmissionCard({
  submission,
  onActionComplete,
}: {
  submission: Submission
  onActionComplete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  const preview = submission.text_content?.substring(0, 200) ||
    submission.photo_caption?.substring(0, 200) ||
    '[No text content]'

  return (
    <Card hover>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {submission.text_content && <FileText className="w-4 h-4 text-slate-500" />}
              {submission.has_photo && <Image className="w-4 h-4 text-slate-500" />}
              {submission.has_voice && <Mic className="w-4 h-4 text-slate-500" />}
              <SubmissionStatusBadge status={submission.status} />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatRelativeDate(submission.submitted_at)}
              </div>
              {submission.author_name && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {submission.author_name}
                </div>
              )}
              {submission.author_email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {submission.author_email}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="text-sm text-text-primary dark:text-dark-text-primary">
          {expanded ? (
            <div className="space-y-3">
              {submission.text_content && (
                <div className="whitespace-pre-wrap">{submission.text_content}</div>
              )}
              {submission.photo_caption && (
                <div className="italic">{submission.photo_caption}</div>
              )}
              {submission.photo_url && (
                <SubmissionPhotoDisplay path={submission.photo_url} />
              )}
              {submission.voice_url && (
                <SubmissionAudioDisplay path={submission.voice_url} />
              )}
            </div>
          ) : (
            <p className="line-clamp-3">{preview}...</p>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-rose-600 dark:text-rose-400 hover:underline"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>

        {/* Moderator Notes */}
        {submission.moderator_notes && (
          <div className="p-3 bg-slate-50 dark:bg-dark-bg-secondary rounded-lg">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Moderator Notes:
            </p>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              {submission.moderator_notes}
            </p>
          </div>
        )}

        {/* Actions */}
        {submission.status === 'pending' && (
          <ModerationActions
            submissionId={submission.id}
            onComplete={() => onActionComplete(submission.id)}
          />
        )}
        {submission.status === 'approved' && submission.slug && (
          <div className="pt-3 border-t border-rose-100 dark:border-dark-bg-tertiary">
            <DeleteStoryButton
              slug={submission.slug}
              title={submission.title || 'Untitled Story'}
              onDeleteComplete={() => onActionComplete(submission.id)}
            />
          </div>
        )}
      </div>
    </Card>
  )
}
