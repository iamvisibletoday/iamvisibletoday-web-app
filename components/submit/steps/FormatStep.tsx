'use client'

import { motion } from 'framer-motion'
import { FileText, Image, Mic, Layers } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useSubmitForm } from '../SubmitFormContext'
import { ContentType } from '@/types/database'

const formats: {
  type: ContentType
  icon: typeof FileText
  label: string
  desc: string
}[] = [
  {
    type: 'text',
    icon: FileText,
    label: 'Text Only',
    desc: 'Share your moment in 100-500 words',
  },
  {
    type: 'photo',
    icon: Image,
    label: 'Photo',
    desc: 'Share a photo with an optional caption',
  },
  {
    type: 'voice',
    icon: Mic,
    label: 'Voice Note',
    desc: 'Record a 1-3 minute voice message',
  },
  {
    type: 'combined',
    icon: Layers,
    label: 'Combined',
    desc: 'Mix any 2 or more formats together',
  },
]

export default function FormatStep() {
  const { updateFormData, setCurrentStep } = useSubmitForm()

  const selectFormat = (contentType: ContentType) => {
    updateFormData({ contentType })
    setCurrentStep(2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-3">
          How would you like to share?
        </h2>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          Choose the format that feels right for your story
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {formats.map((format, idx) => {
          const Icon = format.icon
          return (
            <motion.div
              key={format.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <button
                onClick={() => selectFormat(format.type)}
                className="w-full text-left"
              >
                <Card hover className="p-8 text-center cursor-pointer">
                  <Icon className="w-12 h-12 text-rose-500 dark:text-rose-400 mx-auto mb-4" />
                  <h3 className="font-display text-xl text-text-primary dark:text-dark-text-primary mb-2">
                    {format.label}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {format.desc}
                  </p>
                </Card>
              </button>
            </motion.div>
          )
        })}
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={() => setCurrentStep(0)}>
          Back
        </Button>
      </div>
    </motion.div>
  )
}
