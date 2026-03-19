'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const guidelines = [
  {
    title: 'Be Real and Honest',
    desc: 'Share authentic moments. They don\'t need to be dramatic or perfectly written. A moment of courage in your daily life is exactly what we\'re here for.',
  },
  {
    title: 'Respect Boundaries',
    desc: 'Don\'t share others\' stories or identities without consent. Your visibility doesn\'t override someone else\'s privacy.',
  },
  {
    title: 'No Hate or Harm',
    desc: 'Stories targeting individuals or groups based on identity, beliefs, or background won\'t be published. We\'re building a space of compassion.',
  },
  {
    title: 'Keep it Constructive',
    desc: 'We publish stories, not debates. If you\'re sharing about conflict or disagreement, focus on your experience, not blame.',
  },
  {
    title: 'Mind the Details',
    desc: 'Avoid sharing other people\'s names or identifying details without their permission. Being visible is your choice, not theirs.',
  },
  {
    title: 'Content Warnings Matter',
    desc: 'If your story touches on heavy topics (loss, abuse, self-harm), let us know so readers can choose to engage mindfully.',
  },
]

const process = [
  {
    step: '1',
    title: 'You Submit',
    desc: 'Share your moment via text, photo, or voice. You decide how much to reveal about yourself.',
  },
  {
    step: '2',
    title: 'We Read & Reflect',
    desc: 'A human curator reads your story with care, checking it against our guidelines and ensuring it\'s safe to share.',
  },
  {
    step: '3',
    title: 'You Hear Back',
    desc: 'Within 24-48 hours, your story is either published or we explain why thoughtfully and kindly.',
  },
  {
    step: '4',
    title: 'It\'s Witnessed',
    desc: 'Your story becomes part of our archive, seen by others seeking connection and understanding.',
  },
]

export default function GuidelinesPageClient() {
  return (
    <>
      {/* Header */}
      <section className="py-6 md:py-8 bg-rose-50 dark:bg-dark-bg-secondary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl text-text-primary dark:text-dark-text-primary mb-4">
              Community Guidelines
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Our guidelines exist to keep this a safe, respectful space where authenticity thrives.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* What We Publish */}
      <section className="py-16">
        <Container maxWidth="wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-6 text-center">
              What makes a story shareable
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines.map((guideline, idx) => (
              <motion.div
                key={guideline.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-3">
                    {guideline.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {guideline.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Process */}
      <section className="py-16 bg-slate-50 dark:bg-dark-bg-secondary border-b border-rose-200 dark:border-dark-bg-tertiary transition-colors duration-200">
        <Container maxWidth="wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-6 text-center">
              Your story&apos;s journey
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full relative">
                  <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                    <span className="font-display text-xl text-rose-600 dark:text-rose-400 font-bold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Rejections */}
      <section className="py-16">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-rose-50 dark:bg-dark-bg-tertiary border border-rose-200 dark:border-rose-900/30">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
                What stories we don&apos;t publish
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                We make exceptions thoughtfully, but generally don&apos;t publish stories that:
              </p>
              <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <li>• Target or demean individuals or groups</li>
                <li>• Contain graphic violence or explicit content</li>
                <li>• Promote illegal activities or self-harm</li>
                <li>• Share private information without consent</li>
                <li>• Contain spam, advertisements, or commercial promotion</li>
                <li>• Are off-topic or unrelated to personal visibility moments</li>
              </ul>
              <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary mt-6 pt-6 border-t border-rose-200 dark:border-rose-900/30">
                <strong>If your story is rejected:</strong> We send a thoughtful explanation of why, not silence. We also welcome appeals if you believe we misunderstood your intent.
              </p>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* Legal Compliance */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary border-b border-rose-200 dark:border-dark-bg-tertiary transition-colors duration-200">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-l-4 border-l-rose-500 dark:border-l-rose-400">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-6">
                Legal & Enforcement
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">Binding Agreement</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    These guidelines are incorporated into our Terms of Service. By submitting content, you agree to follow them. Violations may result in content removal, account suspension, or termination.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">Content Ownership</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    You retain ownership of your story. By submitting, you grant us a license to display and archive it. Your content must be original or have permission from the copyright holder.
                  </p>
                  <Link href="/terms" className="text-rose-600 dark:text-rose-400 hover:underline text-sm font-medium">
                    Learn more in Terms of Service →
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">Reporting Violations</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    If you find a story that violates these guidelines, report it to{' '}
                    <a href="mailto:report@iamvisibletoday.com" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                      report@iamvisibletoday.com
                    </a>
                    . Include the story title and why you believe it violates guidelines. We will review within 48 hours.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">Mental Health Resources</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    <strong>This platform is not a substitute for professional mental health care.</strong> If you are struggling:
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary ml-4">
                    <li>
                      <strong>US:</strong> Call or text{' '}
                      <a href="tel:988" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                        988
                      </a>{' '}
                      (Suicide & Crisis Lifeline)
                    </li>
                    <li>
                      <strong>Canada:</strong> Call{' '}
                      <a href="tel:+1-833-456-4566" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                        1-833-456-4566
                      </a>{' '}
                      (Crisis Text Line)
                    </li>
                    <li>
                      <strong>International:</strong> Visit{' '}
                      <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                        findahelpline.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* Questions */}
      <section className="py-16 bg-rose-50 dark:bg-dark-bg-secondary transition-colors duration-200">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
              Have questions about our guidelines?
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
              Our moderation team is here to help clarify.{' '}
              <Link href="/contact" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                Contact us
              </Link>{' '}
              for any questions about these guidelines or our moderation process.
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
