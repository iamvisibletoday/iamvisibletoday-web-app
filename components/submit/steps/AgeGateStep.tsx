'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ShieldCheck } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useSubmitForm } from '../SubmitFormContext'

export default function AgeGateStep() {
  const { updateFormData, setCurrentStep } = useSubmitForm()
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState('')

  const validateAge = () => {
    if (!birthDate) {
      setError('Please enter your birth date')
      return
    }

    const birth = new Date(birthDate)
    const today = new Date()

    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    if (age < 13) {
      setError(
        'You must be 13 or older to submit a story. This is required by law (COPPA) to protect children online.'
      )
      return
    }

    updateFormData({ birthDate, isOver13: true })
    setCurrentStep(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-md mx-auto p-8">
        <div className="text-center mb-6">
          <Calendar className="w-12 h-12 text-rose-500 dark:text-rose-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-2">
            Age Verification
          </h2>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            We need to verify you&apos;re 13 or older to comply with child
            safety laws (COPPA).
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="birth-date"
              className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2"
            >
              Date of Birth
            </label>
            <input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value)
                setError('')
              }}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <Button onClick={validateAge} className="w-full">
            Continue
          </Button>

          <div className="flex items-start gap-2 text-xs text-text-secondary dark:text-dark-text-secondary mt-4">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
            <span>
              Your birth date is only used for this one-time check and is{' '}
              <strong>never stored</strong> or transmitted to our servers.
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
