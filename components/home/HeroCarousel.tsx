'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselStory {
  id: string
  slug: string
  title: string
  text_content?: string
  content_type: 'text' | 'photo' | 'voice' | 'combined'
  photo_url?: string
  author_name?: string
}

interface HeroCarouselProps {
  stories: CarouselStory[]
}

const contentTypeIcons: Record<string, string> = {
  text: '📝',
  photo: '📸',
  voice: '🎙️',
  combined: '✨',
}

export default function HeroCarousel({ stories }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const displayStories = useMemo(() => stories.slice(0, 5), [stories])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayStories.length)
    setIsAutoPlay(false)
  }, [displayStories.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayStories.length - 1 : prev - 1
    )
    setIsAutoPlay(false)
  }, [displayStories.length])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || displayStories.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayStories.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay, displayStories.length])

  if (displayStories.length === 0) {
    return null
  }

  const currentStory = displayStories[currentIndex]
  const excerpt = currentStory.text_content
    ? currentStory.text_content.substring(0, 150) + '...'
    : 'A moment of visibility...'

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Background layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary" />

      {/* Floating background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 dark:bg-rose-900 rounded-full opacity-10 dark:opacity-5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 dark:bg-amber-900 rounded-full opacity-10 dark:opacity-5 blur-3xl" />

      {/* Carousel container */}
      <div className="relative h-full flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="space-y-8"
            >
              {/* Glassmorphic card */}
              <div className="relative group">
                {/* Backdrop blur container */}
                <div className="absolute inset-0 bg-white/20 dark:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-white/10 shadow-2xl" />

                {/* Content */}
                <div className="relative p-8 md:p-12 space-y-6">
                  {/* Content type icon and badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {contentTypeIcons[currentStory.content_type]}
                    </span>
                    <div className="h-8 px-3 rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 dark:from-rose-400/20 dark:to-amber-400/20 backdrop-blur-sm flex items-center">
                      <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-3xl md:text-5xl font-display text-text-primary dark:text-dark-text-primary mb-4 leading-tight">
                      {currentStory.title}
                    </h2>
                    {currentStory.author_name && (
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        By {currentStory.author_name}
                      </p>
                    )}
                  </div>

                  {/* Excerpt */}
                  <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed font-serif max-w-2xl">
                    {excerpt}
                  </p>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link href={`/story/${currentStory.slug}`}>
                      <Button size="lg" className="group/btn">
                        <span className="relative z-10">Read Full Story</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-rose-600 to-amber-600 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {displayStories.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx)
                        setIsAutoPlay(false)
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? 'bg-rose-500 w-8'
                          : 'bg-slate-300 dark:bg-slate-600 w-2 hover:bg-rose-300'
                      }`}
                      aria-label={`Go to story ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  {currentIndex + 1} / {displayStories.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
            <button
              onClick={goToPrev}
              className="pointer-events-auto p-3 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 text-text-primary dark:text-dark-text-primary hover:scale-110 active:scale-95"
              aria-label="Previous story"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="pointer-events-auto p-3 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 text-text-primary dark:text-dark-text-primary hover:scale-110 active:scale-95"
              aria-label="Next story"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
