'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, Mic, Edit2, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useSubmitForm } from '../SubmitFormContext'
import { createSubmission } from '@/lib/data/submissions'
import { uploadPhoto, uploadVoice } from '@/lib/supabase/storage'
import { countWords } from '@/lib/utils/format'

export default function ReviewStep() {
  const { formData, setCurrentStep } = useSubmitForm()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    try {
      let photoUrl: string | undefined
      let voiceUrl: string | undefined

      // Upload photo if present
      if (formData.photoFile) {
        photoUrl = await uploadPhoto(formData.photoFile)
      }

      // Upload voice if present
      if (formData.voiceBlob) {
        voiceUrl = await uploadVoice(formData.voiceBlob)
      }

      const result = await createSubmission({
        title: formData.title || undefined,
        text_content: formData.textContent || undefined,
        photo_caption: formData.photoCaption || undefined,
        photo_url: photoUrl,
        voice_url: voiceUrl,
        has_photo: !!formData.photoFile,
        has_voice: !!formData.voiceBlob,
        author_name: formData.authorName || undefined,
        author_email: formData.authorEmail || undefined,
        include_face: formData.includeFace,
        strip_exif: formData.stripExif,
      })

      if (result.success) {
        setCurrentStep(5) // Confirmation
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Failed to submit. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const wordCount = formData.textContent
    ? countWords(formData.textContent)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-3">
          Review Your Story
        </h2>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          Take a moment to review before submitting
        </p>
      </div>

      {/* Title */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wide">
            Title
          </h3>
          <button
            onClick={() => setCurrentStep(2)}
            className="text-rose-600 dark:text-rose-400 hover:underline text-sm flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
        </div>
        <p className="text-lg font-display text-text-primary dark:text-dark-text-primary">
          {formData.title || 'Untitled'}
        </p>
      </Card>

      {/* Text Content */}
      {formData.textContent && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Text ({wordCount} words)
            </h3>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-rose-600 dark:text-rose-400 hover:underline text-sm flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
          </div>
          <p className="text-text-primary dark:text-dark-text-primary font-serif leading-relaxed line-clamp-6">
            {formData.textContent}
          </p>
        </Card>
      )}

      {/* Photo */}
      {formData.photoPreviewUrl && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wide flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Photo
            </h3>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-rose-600 dark:text-rose-400 hover:underline text-sm flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={formData.photoPreviewUrl}
            alt="Preview"
            className="w-full h-auto max-h-[200px] object-contain rounded-lg bg-slate-50 dark:bg-dark-bg-tertiary"
          />
          {formData.photoCaption && (
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary italic mt-2">
              {formData.photoCaption}
            </p>
          )}
        </Card>
      )}

      {/* Voice */}
      {formData.voicePreviewUrl && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wide flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Voice Note
            </h3>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-rose-600 dark:text-rose-400 hover:underline text-sm flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
          </div>
          <audio
            controls
            src={formData.voicePreviewUrl}
            className="w-full"
            preload="metadata"
          />
        </Card>
      )}

      {/* Privacy Settings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary uppercase tracking-wide">
            Privacy Settings
          </h3>
          <button
            onClick={() => setCurrentStep(3)}
            className="text-rose-600 dark:text-rose-400 hover:underline text-sm flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
        </div>
        <ul className="space-y-1 text-sm text-text-primary dark:text-dark-text-primary">
          <li>
            <strong>Display as:</strong>{' '}
            {formData.authorName || 'Anonymous'}
          </li>
          {formData.authorEmail && (
            <li>
              <strong>Email:</strong> {formData.authorEmail}
            </li>
          )}
          {(formData.contentType === 'photo' || formData.contentType === 'combined') && (
            <>
              <li>
                <strong>Face visible:</strong>{' '}
                {formData.includeFace ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Location data stripped:</strong>{' '}
                {formData.stripExif ? 'Yes' : 'No'}
              </li>
            </>
          )}
        </ul>
      </Card>

      {/* Submission Notice */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Your story will be reviewed by a human moderator before publishing.
          This typically takes 24-48 hours. We&apos;ll notify you by email if
          you provided one.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-lg p-4"
        >
          <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
        </motion.div>
      )}

      <div className="flex gap-4 justify-between pt-6 border-t border-rose-100 dark:border-dark-bg-tertiary">
        <Button variant="ghost" onClick={() => setCurrentStep(3)} disabled={submitting}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Your Story'
          )}
        </Button>
      </div>
    </motion.div>
  )
}
