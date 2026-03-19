'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { ContentType } from '@/types/database'

export interface FormData {
  // Age Gate
  birthDate?: string
  isOver13?: boolean

  // Format
  contentType?: ContentType

  // Content
  title?: string
  textContent?: string
  photoFile?: File
  photoPreviewUrl?: string
  photoCaption?: string
  voiceBlob?: Blob
  voicePreviewUrl?: string

  // Privacy
  authorName?: string
  authorEmail?: string
  includeFace: boolean
  stripExif: boolean

  // Content Warning
  hasContentWarning: boolean
  warningText?: string
}

interface FormContextValue {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  resetForm: () => void
}

const FormContext = createContext<FormContextValue | undefined>(undefined)

const INITIAL_DATA: FormData = {
  includeFace: false,
  stripExif: true,
  hasContentWarning: false,
}

const STORAGE_KEY = 'iamvisibletoday_submission_draft'

function loadDraft(): { formData: FormData; step: number } {
  if (typeof window === 'undefined') return { formData: INITIAL_DATA, step: 0 }
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        formData: {
          ...INITIAL_DATA,
          title: parsed.title,
          textContent: parsed.textContent,
          photoCaption: parsed.photoCaption,
          authorName: parsed.authorName,
          authorEmail: parsed.authorEmail,
          contentType: parsed.contentType,
          includeFace: parsed.includeFace ?? false,
          stripExif: parsed.stripExif ?? true,
          hasContentWarning: parsed.hasContentWarning ?? false,
          warningText: parsed.warningText,
        },
        step: parsed.currentStep || 0,
      }
    }
  } catch {
    // Ignore parse errors
  }
  return { formData: INITIAL_DATA, step: 0 }
}

export function SubmitFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(() => loadDraft().formData)
  const [currentStep, setCurrentStep] = useState(() => loadDraft().step)

  // Save draft to sessionStorage on change (after age gate)
  useEffect(() => {
    if (currentStep > 0) {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            title: formData.title,
            textContent: formData.textContent,
            photoCaption: formData.photoCaption,
            authorName: formData.authorName,
            authorEmail: formData.authorEmail,
            contentType: formData.contentType,
            includeFace: formData.includeFace,
            stripExif: formData.stripExif,
            hasContentWarning: formData.hasContentWarning,
            warningText: formData.warningText,
            currentStep,
          })
        )
      } catch {
        // Ignore storage errors
      }
    }
  }, [formData, currentStep])

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const resetForm = () => {
    setFormData(INITIAL_DATA)
    setCurrentStep(0)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, currentStep, setCurrentStep, resetForm }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useSubmitForm() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useSubmitForm must be used within SubmitFormProvider')
  }
  return context
}
