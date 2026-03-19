'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useSubmitForm } from '../SubmitFormContext'
import TextEditor from '../form-fields/TextEditor'
import PhotoUpload from '../form-fields/PhotoUpload'
import VoiceRecorder from '../form-fields/VoiceRecorder'
import { countWords } from '@/lib/utils/format'

function TitleInput() {
  const { formData, updateFormData } = useSubmitForm()
  return (
    <div>
      <label
        htmlFor="story-title-standalone"
        className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2"
      >
        Title <span className="text-rose-500">*</span>
      </label>
      <input
        id="story-title-standalone"
        type="text"
        placeholder="Give your moment a title..."
        value={formData.title || ''}
        onChange={(e) => updateFormData({ title: e.target.value })}
        maxLength={100}
        className="w-full px-4 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow"
      />
    </div>
  )
}

export default function ContentStep() {
  const { formData, setCurrentStep } = useSubmitForm()
  const { contentType } = formData

  const canContinue = () => {
    if (!formData.title?.trim()) return false

    switch (contentType) {
      case 'text': {
        const count = formData.textContent ? countWords(formData.textContent) : 0
        return count >= 100 && count <= 500
      }
      case 'photo':
        return !!formData.photoFile
      case 'voice':
        return !!formData.voiceBlob
      case 'combined':
        return !!(formData.textContent || formData.photoFile || formData.voiceBlob)
      default:
        return false
    }
  }

  const showText = contentType === 'text' || contentType === 'combined'
  const showPhoto = contentType === 'photo' || contentType === 'combined'
  const showVoice = contentType === 'voice' || contentType === 'combined'

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-3">
          Share Your Moment
        </h2>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          Your story matters. Take your time.
        </p>
      </div>

      {/* Title is always shown for non-text types that don't include TextEditor */}
      {!showText && <TitleInput />}

      {showText && <TextEditor isRequired={contentType !== 'combined'} />}

      {showPhoto && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: showText ? 0.1 : 0 }}
        >
          <PhotoUpload isRequired={contentType !== 'combined'} />
        </motion.div>
      )}

      {showVoice && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (() => {
            if (showText && showPhoto) return 0.2
            if (showText || showPhoto) return 0.1
            return 0
          })() }}
        >
          <VoiceRecorder isRequired={contentType !== 'combined'} />
        </motion.div>
      )}

      <div className="flex gap-4 justify-between pt-6 border-t border-rose-100 dark:border-dark-bg-tertiary">
        <Button variant="ghost" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep(3)} disabled={!canContinue()}>
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
