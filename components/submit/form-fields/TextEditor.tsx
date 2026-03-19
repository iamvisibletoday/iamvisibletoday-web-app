'use client'

import { useSubmitForm } from '../SubmitFormContext'
import { countWords } from '@/lib/utils/format'

const MIN_WORDS = 100
const MAX_WORDS = 500

interface TextEditorProps {
  isRequired?: boolean
}

export default function TextEditor({ isRequired = true }: TextEditorProps) {
  const { formData, updateFormData } = useSubmitForm()
  const wordCount = formData.textContent ? countWords(formData.textContent) : 0

  const getCountColor = () => {
    if (wordCount > MAX_WORDS) return 'text-rose-600 dark:text-rose-400'
    if (wordCount >= MIN_WORDS) return 'text-green-600 dark:text-green-400'
    if (wordCount > MAX_WORDS * 0.8)
      return 'text-amber-600 dark:text-amber-400'
    return 'text-slate-500 dark:text-slate-400'
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label
          htmlFor="story-title"
          className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2"
        >
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="story-title"
          type="text"
          placeholder="Give your moment a title..."
          value={formData.title || ''}
          onChange={(e) => updateFormData({ title: e.target.value })}
          maxLength={100}
          className="w-full px-4 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow"
        />
      </div>

      {/* Text Content */}
      <div>
        <label
          htmlFor="story-content"
          className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2"
        >
          Your Story {isRequired && <span className="text-rose-500">*</span>}
        </label>
        <textarea
          id="story-content"
          placeholder="Share your moment of visibility..."
          value={formData.textContent || ''}
          onChange={(e) => updateFormData({ textContent: e.target.value })}
          rows={12}
          className="w-full px-4 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow font-serif text-lg leading-relaxed resize-y"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {MIN_WORDS}-{MAX_WORDS} words
          </p>
          <p className={`text-sm font-medium ${getCountColor()}`}>
            {wordCount} / {MAX_WORDS} words
          </p>
        </div>
      </div>
    </div>
  )
}
