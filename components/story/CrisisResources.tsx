'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import Card from '@/components/ui/Card'

export default function CrisisResources() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-rose-50 dark:bg-rose-900/10 border-rose-300 dark:border-rose-800">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-rose-600 dark:text-rose-400 mt-1 shrink-0" />
          <div>
            <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-2">
              Need Support?
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
              If this story brought up difficult feelings, please reach out:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong className="text-text-primary dark:text-dark-text-primary">US:</strong>{' '}
                <a
                  href="tel:988"
                  className="text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Call or text 988
                </a>{' '}
                (Suicide &amp; Crisis Lifeline)
              </li>
              <li>
                <strong className="text-text-primary dark:text-dark-text-primary">Canada:</strong>{' '}
                <a
                  href="tel:+1-833-456-4566"
                  className="text-rose-600 dark:text-rose-400 hover:underline"
                >
                  1-833-456-4566
                </a>{' '}
                (Crisis Services Canada)
              </li>
              <li>
                <strong className="text-text-primary dark:text-dark-text-primary">International:</strong>{' '}
                <a
                  href="https://findahelpline.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 dark:text-rose-400 hover:underline"
                >
                  findahelpline.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
