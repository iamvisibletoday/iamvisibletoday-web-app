'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const contacts = [
  {
    icon: '📋',
    title: 'Report Content',
    email: 'report@iamvisibletoday.com',
    description: 'Found a story that violates our guidelines? Report it and include the story title and reason for the report.',
    responseTime: 'Within 48 hours',
  },
  {
    icon: '🔒',
    title: 'Privacy Requests',
    email: 'privacy@iamvisibletoday.com',
    description: 'Privacy requests, data access, deletion requests, and questions about our privacy policy (GDPR, CCPA, COPPA, PIPEDA compliant).',
    responseTime: 'Within 30 days',
  },
  {
    icon: '⚖️',
    title: 'Legal & Terms',
    email: 'legal@iamvisibletoday.com',
    description: 'Questions about our Terms of Service, legal compliance, DMCA notices, or other legal matters.',
    responseTime: 'Within 30 days',
  },
  {
    icon: '💭',
    title: 'Feedback',
    email: 'feedback@iamvisibletoday.com',
    description: 'Have ideas to improve the platform? Share your feedback, suggestions, or feature requests.',
    responseTime: 'Within 30 days',
  },
  {
    icon: '💬',
    title: 'General Inquiries',
    email: 'hello@iamvisibletoday.com',
    description: 'General questions, partnership inquiries, volunteer opportunities, or anything else not covered above.',
    responseTime: 'Within 30 days',
  },
]

export default function ContactPageClient() {
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
              Get in Touch
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              We're here to help. Choose the contact method that best fits your inquiry.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <Container maxWidth="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contacts.map((contact, idx) => (
              <motion.div
                key={contact.email}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-l-4 border-l-rose-500 dark:border-l-rose-400">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{contact.icon}</div>
                    <div>
                      <h3 className="font-display text-xl text-text-primary dark:text-dark-text-primary">
                        {contact.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    {contact.description}
                  </p>
                  <div className="space-y-3 pt-4 border-t border-rose-200 dark:border-rose-900/30">
                    <div>
                      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mb-2">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                      >
                        <span>{contact.email}</span>
                        <span>→</span>
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Typical Response Time</p>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        {contact.responseTime}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      {/* Crisis Resources */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary border-b border-rose-200 dark:border-dark-bg-tertiary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-l-4 border-l-rose-600 dark:border-l-rose-500 bg-rose-50 dark:bg-dark-bg-tertiary">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
                ⚠️ In Crisis?
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                If you or someone you know is in immediate danger or having thoughts of self-harm, please reach out to a crisis service immediately:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                    🇺🇸 United States
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-3">
                    <strong>Suicide & Crisis Lifeline</strong>
                  </p>
                  <a
                    href="tel:988"
                    className="inline-flex items-center gap-2 text-lg font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                  >
                    988
                  </a>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-2">
                    Call or text 24/7
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                    🇨🇦 Canada
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-3">
                    <strong>Crisis Services Canada</strong>
                  </p>
                  <a
                    href="tel:+1-833-456-4566"
                    className="inline-flex items-center gap-2 text-lg font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                  >
                    1-833-456-4566
                  </a>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-2">
                    Call 24/7
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                    🌍 International
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-3">
                    <strong>Find a Helpline</strong>
                  </p>
                  <a
                    href="https://findahelpline.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                  >
                    Visit findahelpline.com
                    <span>→</span>
                  </a>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-2">
                    Global crisis resources
                  </p>
                </div>
              </div>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-6 pt-6 border-t border-rose-200 dark:border-rose-900/30">
                This platform is not a substitute for professional mental health care. Please reach out to qualified professionals if you need support.
              </p>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-rose-50 dark:bg-dark-bg-tertiary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-12 text-center">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                q: 'How long will it take to hear back from you?',
                a: <>We aim to respond within 30 days for most inquiries. Content moderation reports typically receive a response within 48 hours.</>,
              },
              {
                q: 'How do I request to delete my submission?',
                a: <>Email <a href="mailto:privacy@iamvisibletoday.com" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">privacy@iamvisibletoday.com</a> with "Privacy Request" in the subject line. Include your submission details, and we will delete your story within 24 hours. Data is removed from all backups within 90 days.</>,
              },
              {
                q: 'What information do I need to provide?',
                a: <>Include relevant details such as the story title, submission date, or any other identifying information. For privacy requests, we may ask for verification to ensure we&apos;re deleting the correct submission.</>,
              },
              {
                q: 'I don\'t feel comfortable emailing. Can I contact you another way?',
                a: <>Email is currently our primary contact method. We&apos;re working on adding additional contact options in the future. Feel free to reach out to <a href="mailto:hello@iamvisibletoday.com" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">hello@iamvisibletoday.com</a> with accessibility requests.</>,
              },
              {
                q: 'Is my email information kept private?',
                a: <>Yes. We collect email only for responding to your inquiry. We do not use it for marketing, and it is not shared with third parties. See our Privacy Policy for details.</>,
              },
            ].map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                    {faq.q}
                  </h3>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {faq.a}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
