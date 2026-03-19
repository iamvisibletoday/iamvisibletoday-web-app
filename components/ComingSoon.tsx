'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from './ui/Container'
import Button from './ui/Button'

interface ComingSoonProps {
  title: string
  description: string
  icon: string
}

export default function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="min-h-[calc(100vh-400px)] flex items-center justify-center py-20">
      <Container maxWidth="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">{icon}</div>
          <h1 className="font-display text-4xl md:text-5xl text-text-primary dark:text-dark-text-primary mb-4">
            {title}
          </h1>
          <p className="text-xl text-text-secondary dark:text-dark-text-secondary mb-8 max-w-xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button>
                Back to Home
              </Button>
            </Link>
            <a href="https://ko-fi.com/iamvisibletoday" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                Support Us
              </Button>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 p-6 bg-rose-50 dark:bg-rose-900/10 rounded-lg border border-rose-200 dark:border-rose-800"
          >
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              Want to be notified when this launches? Support us on Ko-Fi and join our community.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  )
}
