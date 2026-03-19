'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, BookOpen, PenLine, Heart } from 'lucide-react'
import Button from '@/components/ui/Button'
import CrisisResources from '@/components/story/CrisisResources'
import { useSubmitForm } from '../SubmitFormContext'

export default function ConfirmationStep() {
  const { resetForm } = useSubmitForm()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Success Animation */}
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 dark:text-green-400 mx-auto mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-3">
            Thank You for Being Visible
          </h2>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-md mx-auto">
            Your story has been submitted and is now in our moderation queue. A
            human will review it with care.
          </p>
        </motion.div>
      </div>

      {/* What Happens Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-lg p-6"
      >
        <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-3">
          What happens next?
        </h3>
        <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-rose-500 mt-0.5">1.</span>
            A human moderator will review your story within 24-48 hours
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 mt-0.5">2.</span>
            If approved, your story will appear in our archive
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 mt-0.5">3.</span>
            If you provided an email, we&apos;ll notify you when it&apos;s published
          </li>
        </ul>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link href="/archive">
          <Button variant="secondary" size="lg">
            <BookOpen className="w-5 h-5" />
            Browse Stories
          </Button>
        </Link>
        <Button variant="ghost" size="lg" onClick={resetForm}>
          <PenLine className="w-5 h-5" />
          Share Another Story
        </Button>
      </motion.div>

      {/* Ko-Fi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="text-center bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-6"
      >
        <Heart className="w-8 h-8 text-rose-500 mx-auto mb-3" />
        <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-2">
          Support This Project
        </h3>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
          I Am Visible Today is free, ad-free, and donation-supported. Your
          contribution helps keep this space alive.
        </p>
        <a
          href="https://ko-fi.com/iamvisibletoday"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" size="sm">
            Support on Ko-Fi
          </Button>
        </a>
      </motion.div>

      {/* Crisis Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <CrisisResources />
      </motion.div>
    </motion.div>
  )
}
