'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface ContentWarningProps {
  warningText: string
  onContinue: () => void
}

export default function ContentWarning({
  warningText,
  onContinue,
}: ContentWarningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="text-center p-8 bg-amber-50 dark:bg-amber-900/10 border-amber-300 dark:border-amber-800">
        <AlertTriangle className="w-12 h-12 text-amber-600 dark:text-amber-500 mx-auto mb-4" />
        <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
          Content Warning
        </h2>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
          {warningText}
        </p>
        <div className="space-y-3">
          <Button onClick={onContinue} variant="primary">
            I Understand, Continue Reading
          </Button>
          <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
            Crisis resources are available at the bottom of the page.
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
