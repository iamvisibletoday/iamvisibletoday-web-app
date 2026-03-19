'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const values = [
  {
    title: 'Privacy First',
    desc: 'We believe you should never be forced to choose between being seen and being safe. Your data is yours alone.',
    icon: '🔒',
  },
  {
    title: 'Human Curation',
    desc: 'No algorithms decide what you see. Real people, with compassion and judgment, thoughtfully review every story.',
    icon: '👥',
  },
  {
    title: 'Radical Honesty',
    desc: 'We tell you exactly how we work, what we collect, and why. No dark patterns, no hidden agendas.',
    icon: '💬',
  },
  {
    title: 'Accessibility',
    desc: 'This space is for everyone. We\'re committed to making visibility accessible regardless of ability, language, or background.',
    icon: '🌍',
  },
  {
    title: 'Sustainability',
    desc: 'Built on donations, not ads or data sales. This platform exists to serve you, not exploit you.',
    icon: '💚',
  },
  {
    title: 'Compassion',
    desc: 'Behind every story is a person. We treat each submission, each person, with the respect and care they deserve.',
    icon: '❤️',
  },
]

const differences = [
  {
    title: 'Not an Algorithm',
    desc: 'Social platforms optimize for engagement, which means conflict, outrage, and addiction. We optimize for authenticity. Every story you read was chosen by a human who believed it deserved to be witnessed.',
  },
  {
    title: 'Not Ad-Supported',
    desc: 'When your attention is the product, you stop being a person and start being inventory. We are funded by donations from people who believe in the mission.',
  },
  {
    title: 'Human Curation Matters',
    desc: 'AI can process stories at scale, but it misses nuance, context, and humanity. Every submission is read by a real person who understands context and intent.',
  },
  {
    title: 'Genuinely Anonymous',
    desc: 'We don\'t track you across the web, build shadow profiles, or use your data to predict behavior. You can be completely anonymous here.',
  },
]

export default function AboutPageClient() {
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
              About I Am Visible Today
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              A platform built on trust, privacy, and the belief that small moments of courage deserve to be witnessed.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-10 bg-white dark:bg-dark-bg-primary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-rose-50 dark:bg-dark-bg-tertiary border border-rose-200 dark:border-rose-900/30">
              <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-4">
                Our Mission
              </h2>
              <p className="font-serif text-lg text-text-primary dark:text-dark-text-primary leading-relaxed">
                We create a space where ordinary acts of courage are witnessed with compassion. Built on human curation (not algorithms), privacy (not surveillance), and donations (not exploitation).
              </p>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-10 bg-rose-50 dark:bg-dark-bg-tertiary border-b border-rose-200 dark:border-rose-900/30 transition-colors duration-200">
        <Container maxWidth="wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-6 text-center">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {value.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How We're Different */}
      <section className="py-10 bg-white dark:bg-dark-bg-primary border-b border-rose-200 dark:border-dark-bg-tertiary transition-colors duration-200">
        <Container maxWidth="wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-6 text-center">
              How We're Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differences.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-l-4 border-l-rose-500 dark:border-l-rose-400">
                  <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-3">
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

      {/* The Team */}
      <section className="py-10 bg-rose-50 dark:bg-dark-bg-tertiary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-8 text-center">
                Who We Are
              </h2>
              <div className="space-y-6">
                <p className="font-serif text-lg text-text-primary dark:text-dark-text-primary leading-relaxed">
                  Right now, <strong>I Am Visible Today</strong> is built and curated by one person: an ordinary technologist who has been fortunate to be supported and helped by kind-hearted people in overcoming everyday struggles.
                </p>
                <p className="font-serif text-lg text-text-primary dark:text-dark-text-primary leading-relaxed">
                  <i>
                    &ldquo;That experience taught me that visibility and connection matter. I'm building this platform with a simple vision: to create a space where authenticity matters more than engagement, and where privacy is never traded for growth. I'm planning to grow this team with others who share these values.&rdquo;
                  </i>
                </p>
                <p className="font-serif text-lg text-text-primary dark:text-dark-text-primary leading-relaxed">
                  <i>
                    &ldquo;This project started as a belief: that visibility is healing, and that deserves a space built with care, not extraction. I'm committed to keeping that promise as we grow.&rdquo;
                  </i>
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Future Vision */}
      <section className="py-10 bg-white dark:bg-dark-bg-primary border-b border-rose-200 dark:border-dark-bg-tertiary transition-colors duration-200">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl text-text-primary dark:text-dark-text-primary mb-6 text-center">
              What's Next
            </h2>
            <div className="max-w-3xl mx-auto mb-12">
              <p className="font-serif text-lg text-text-primary dark:text-dark-text-primary leading-relaxed mb-6">
                Mental health is personal. It's vulnerable. It requires spaces where you can be honest without fear of judgment, algorithmic ranking, or being turned into data.
              </p>
              <p className="font-serif text-lg text-text-primary dark:text-dark-text-primary leading-relaxed">
                Current platforms optimize for engagement and profit. That means conflict, comparison, and constant surveillance. For people struggling with mental health, these platforms can make things worse. What's needed is something fundamentally different: a space built for connection, not extraction. For healing, not profit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-l-4 border-l-rose-500 dark:border-l-rose-400">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-rose-500 dark:bg-rose-400 flex items-center justify-center shrink-0">
                      <span className="font-display text-xl font-bold text-white">1</span>
                    </div>
                    <h3 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mt-1">Now</h3>
                  </div>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                    A curated archive where people's visibility moments are witnessed with care. Real human moderation. No algorithms deciding what matters. Just authentic stories being held safely.
                  </p>
                  <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary font-serif italic">
                    Building a safe space
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-l-4 border-l-rose-500 dark:border-l-rose-400">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-rose-400 dark:bg-rose-500 flex items-center justify-center shrink-0">
                      <span className="font-display text-xl font-bold text-white">2</span>
                    </div>
                    <h3 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mt-1">Next</h3>
                  </div>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                    A network of genuinely private communities curated by humans, not algorithms. Where people find others who understand without being tracked, profiled, or sold to. Real moderation. Real anonymity. Real safety.
                  </p>
                  <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary font-serif italic">
                    Communities without exploitation
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Built With */}
      <section className="py-10 bg-white dark:bg-dark-bg-primary border-b border-rose-200 dark:border-dark-bg-tertiary transition-colors duration-200">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-6 text-center">
              Built With
            </h2>
            <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
              I Am Visible Today is built on privacy-first, open-source technologies and hosted on infrastructure that respects user privacy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'Next.js', desc: 'React framework for production' },
                { name: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
                { name: 'Framer Motion', desc: 'Animation library for React' },
                { name: 'Supabase', desc: 'Open-source Firebase alternative' },
                { name: 'Vercel', desc: 'Hosting & Web Analytics' },
                { name: 'AGPL-3.0', desc: 'Open source license' },
              ].map((tech) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center">
                    <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary mb-2">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      {tech.desc}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Get Involved */}
      <section className="py-10 bg-rose-50 dark:bg-dark-bg-tertiary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white dark:bg-dark-bg-primary border border-rose-200 dark:border-rose-900/30">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
                Want to Help?
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                We&apos;re always looking for volunteers, collaborators, and people who believe in what we&apos;re building. Whether you can contribute ideas, time, or financial support:
              </p>
              <div className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <p>
                  <strong className="text-text-primary dark:text-dark-text-primary">Donate:</strong>{' '}
                  <a href="https://ko-fi.com/iamvisibletoday" target="_blank" rel="noopener noreferrer" className="text-rose-600 dark:text-rose-400 hover:underline">
                    Support us on Ko-fi
                  </a>
                </p>
                <p>
                  <strong className="text-text-primary dark:text-dark-text-primary">Share:</strong> Help us reach people who need this space
                </p>
                <p>
                  <strong className="text-text-primary dark:text-dark-text-primary">Feedback:</strong> Have ideas or suggestions?{' '}
                  <Link href="/contact" className="text-rose-600 dark:text-rose-400 hover:underline">
                    Share your feedback
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* Questions */}
      <section className="py-10 bg-rose-50 dark:bg-dark-bg-secondary transition-colors duration-200">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
              Have questions?
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Check out our{' '}
              <Link href="/guidelines" className="text-rose-600 dark:text-rose-400 hover:underline">
                community guidelines
              </Link>
              ,{' '}
              <Link href="/privacy" className="text-rose-600 dark:text-rose-400 hover:underline">
                privacy policy
              </Link>
              , or{' '}
              <Link href="/contact" className="text-rose-600 dark:text-rose-400 hover:underline">
                contact us
              </Link>
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
