'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Share2, Check } from 'lucide-react'
import { Story, StoryLink } from '@/types/database'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContentWarning from '@/components/story/ContentWarning'
import StoryContent from '@/components/story/StoryContent'
import StoryInteractions from '@/components/story/StoryInteractions'
import StoryNavigation from '@/components/story/StoryNavigation'
import CrisisResources from '@/components/story/CrisisResources'
import DeletionRequest from '@/components/story/DeletionRequest'
import { formatDate, countWords, estimateReadingTime } from '@/lib/utils/format'

interface StoryPageClientProps {
  story: Story
  adjacentStories: { previous: StoryLink | null; next: StoryLink | null }
  sessionToken: string
}

export default function StoryPageClient({
  story,
  adjacentStories,
  sessionToken,
}: StoryPageClientProps) {
  const [showContent, setShowContent] = useState(!story.has_content_warning)
  const [copied, setCopied] = useState(false)

  const readingTime = story.text_content
    ? estimateReadingTime(countWords(story.text_content))
    : null

  // Content protection: prevent copying, right-click, save, print
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    const handleSelectStart = (e: Event) => e.preventDefault()
    const handleCopy = (e: ClipboardEvent) => e.preventDefault()
    const handleCut = (e: ClipboardEvent) => e.preventDefault()
    const handleDrag = (e: DragEvent) => e.preventDefault()

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+P
      if (
        e.ctrlKey || e.metaKey
      ) {
        if (e.key === 'c' || e.key === 'x' || e.key === 's' || e.key === 'p') {
          e.preventDefault()
        }
      }
      // Block Print (F12, F11, etc.)
      if (e.key === 'F12') {
        e.preventDefault()
      }
    }

    // Apply content protection
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCut)
    document.addEventListener('drag', handleDrag)
    document.addEventListener('keydown', handleKeyDown)

    // Disable audio download
    const audioElements = document.querySelectorAll('audio')
    audioElements.forEach((audio) => {
      audio.setAttribute('controlsList', 'nodownload')
      audio.style.pointerEvents = 'none'
      // Re-enable pointer events for play button only
      setTimeout(() => {
        audio.style.pointerEvents = 'auto'
      }, 0)
    })

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCut)
      document.removeEventListener('drag', handleDrag)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
    }
  }

  return (
    <>
      {/* Content Protection Wrapper */}
      <div
        className="select-none"
        style={{
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDrag={(e) => e.preventDefault()}
      >
        {/* Header */}
        <section className="py-6 md:py-8 bg-rose-50 dark:bg-dark-bg-secondary border-b border-rose-100 dark:border-dark-bg-tertiary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-4">
              {story.title}
            </h1>

            {/* Date, reading time, and share button */}
            <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
              <span>{formatDate(story.published_date)}</span>
              {readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </>
                )}
              </Button>
            </div>

            {/* Author name */}
            {story.author_name && (
              <p className="text-text-secondary dark:text-dark-text-secondary">
                By {story.author_name}
              </p>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-8 bg-white dark:bg-dark-bg-primary">
        <Container maxWidth="content">
          {story.has_content_warning && !showContent ? (
            <ContentWarning
              warningText={
                story.warning_text || 'This story contains sensitive content.'
              }
              onContinue={() => setShowContent(true)}
            />
          ) : (
            <StoryContent story={story} sessionToken={sessionToken} />
          )}
        </Container>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white dark:bg-dark-bg-primary">
        <Container maxWidth="content">
          <StoryNavigation
            previous={adjacentStories.previous}
            next={adjacentStories.next}
          />
        </Container>
      </section>

      {/* Interactions (Resonate) */}
      <section className="py-8 bg-rose-50 dark:bg-dark-bg-secondary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <p className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-6">
              How does this story resonate with you?
            </p>
            <StoryInteractions
              slug={story.slug}
              initialSeenCount={story.view_count}
              initialRelateCount={story.relate_count}
            />
          </motion.div>
        </Container>
      </section>

      {/* Deletion Request */}
      <section className="py-8 bg-white dark:bg-dark-bg-primary border-t border-slate-100 dark:border-dark-bg-tertiary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <DeletionRequest slug={story.slug} title={story.title} />
          </motion.div>
        </Container>
      </section>

      {/* Crisis Resources */}
      <section className="py-8 bg-rose-50 dark:bg-dark-bg-secondary">
        <Container maxWidth="content">
          <CrisisResources />
        </Container>
      </section>
      </div>
    </>
  )
}
