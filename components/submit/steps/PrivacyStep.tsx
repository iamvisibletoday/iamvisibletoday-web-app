'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useSubmitForm } from '../SubmitFormContext'

export default function PrivacyStep() {
  const { formData, updateFormData, setCurrentStep } = useSubmitForm()

  const hasPhoto = formData.contentType === 'photo' || formData.contentType === 'combined'

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Shield className="w-12 h-12 text-rose-500 dark:text-rose-400 mx-auto mb-4" />
        <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-3">
          Privacy Preferences
        </h2>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          You control how your story appears. Everything is optional.
        </p>
      </div>

      {/* Display Name */}
      <Card className="p-6">
        <label
          htmlFor="author-name"
          className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2"
        >
          Display Name
        </label>
        <input
          id="author-name"
          type="text"
          placeholder="Anonymous"
          value={formData.authorName || ''}
          onChange={(e) => updateFormData({ authorName: e.target.value })}
          maxLength={50}
          className="w-full px-4 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow"
        />
        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-2">
          Leave blank to appear as &ldquo;Anonymous&rdquo;
        </p>
      </Card>

      {/* Email */}
      <Card className="p-6">
        <label
          htmlFor="author-email"
          className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2"
        >
          Email <span className="text-slate-400">(optional)</span>
        </label>
        <input
          id="author-email"
          type="email"
          placeholder="you@example.com"
          value={formData.authorEmail || ''}
          onChange={(e) => updateFormData({ authorEmail: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow"
        />
        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-2">
          Only used to notify you when your story is published. Never shared or sold.
        </p>
      </Card>

      {/* Photo Privacy */}
      {hasPhoto && (
        <Card className="p-6 space-y-4">
          <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
            Photo Privacy
          </h3>

          {/* Include Face */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.includeFace}
              onChange={(e) => updateFormData({ includeFace: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-rose-300 text-rose-500 focus:ring-rose-500"
            />
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                {formData.includeFace ? (
                  <Eye className="w-4 h-4 text-amber-500" />
                ) : (
                  <EyeOff className="w-4 h-4 text-green-500" />
                )}
                <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                  My photo includes my face
                </span>
              </div>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                {formData.includeFace
                  ? 'Your face will be visible in the published story.'
                  : 'Face not included. Your identity stays private.'}
              </p>
            </div>
          </label>

          {/* EXIF Stripping */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.stripExif}
              onChange={(e) => updateFormData({ stripExif: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-rose-300 text-rose-500 focus:ring-rose-500"
            />
            <div>
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Strip location data from photo
              </span>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                Removes GPS coordinates, camera info, and other metadata.
                Strongly recommended for privacy.
              </p>
            </div>
          </label>
        </Card>
      )}

      {/* Content Warning */}
      <Card className="p-6 space-y-4">
        <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
          Content Warning
        </h3>

        <label htmlFor="content-warning" className="flex items-start gap-3 cursor-pointer">
          <input
            id="content-warning"
            type="checkbox"
            checked={formData.hasContentWarning}
            onChange={(e) => updateFormData({ hasContentWarning: e.target.checked })}
            className="mt-1 w-4 h-4 rounded border-rose-300 text-rose-500 focus:ring-rose-500"
          />
          <div>
            <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
              My story contains potentially sensitive content
            </span>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
              Examples: mentions of self-harm, abuse, trauma, loss, grief, etc.
            </p>
          </div>
        </label>

        {formData.hasContentWarning && (
          <textarea
            value={formData.warningText || ''}
            onChange={(e) => updateFormData({ warningText: e.target.value })}
            placeholder="Brief description (e.g., 'Mentions of loss and grief')"
            maxLength={200}
            className="w-full px-3 py-2 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
            rows={2}
          />
        )}
      </Card>

      {/* Privacy Assurance */}
      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm text-green-800 dark:text-green-300">
          <strong>Your privacy is sacred.</strong> We never sell data, never
          track users, and never use content for AI training. Your story is
          reviewed by a human and published with care.
        </p>
      </div>

      <div className="flex gap-4 justify-between pt-6 border-t border-rose-100 dark:border-dark-bg-tertiary">
        <Button variant="ghost" onClick={() => setCurrentStep(2)}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep(4)}>Review & Submit</Button>
      </div>
    </motion.div>
  )
}
