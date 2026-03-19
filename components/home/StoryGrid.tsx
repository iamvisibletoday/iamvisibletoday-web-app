'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { memo } from 'react'

interface StoryCard {
  id: string
  slug: string
  title: string
  text_content?: string
  content_type: 'text' | 'photo' | 'voice' | 'combined'
}

interface StoryGridProps {
  stories: StoryCard[]
}

const contentTypeIcons: Record<string, string> = {
  text: '📝',
  photo: '📸',
  voice: '🎙️',
  combined: '✨',
}

const StoryCard = memo(
  ({ story, index }: { story: StoryCard; index: number }) => {
    const excerpt = story.text_content
      ? story.text_content.substring(0, 120) + '...'
      : 'A moment of visibility...'

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <Link href={`/story/${story.slug}`}>
          <div className="group relative h-full cursor-pointer overflow-hidden">
            {/* Glassmorphic background */}
            <div className="absolute inset-0 bg-white/15 dark:bg-white/8 backdrop-blur-xl rounded-xl border border-white/20 dark:border-white/10 transition-all duration-300 group-hover:bg-white/25 dark:group-hover:bg-white/15 group-hover:border-white/40 dark:group-hover:border-white/20" />

            {/* Content */}
            <div className="relative p-6 h-full flex flex-col justify-between space-y-4">
              {/* Top section: Icon and title */}
              <div className="space-y-3">
                <div className="text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {contentTypeIcons[story.content_type]}
                </div>

                <h3 className="text-lg md:text-xl font-display text-text-primary dark:text-dark-text-primary leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                  {story.title}
                </h3>
              </div>

              {/* Excerpt */}
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed line-clamp-3 flex-grow">
                {excerpt}
              </p>

              {/* Bottom: CTA indicator */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-white/5">
                <span className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read Story
                </span>
                <div className="text-rose-500 dark:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  →
                </div>
              </div>

              {/* Hover overlay glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 bg-gradient-to-br from-rose-400 to-amber-400 dark:from-rose-500 dark:to-amber-500 blur-xl pointer-events-none transition-opacity duration-300" />
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }
)

StoryCard.displayName = 'StoryCard'

export default function StoryGrid({ stories }: StoryGridProps) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary dark:text-dark-text-secondary">
          No stories yet. Be the first to share yours.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stories.map((story, index) => (
          <StoryCard key={story.id} story={story} index={index} />
        ))}
      </div>

      {/* Show more hint */}
      {stories.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/archive" className="inline-block">
            <div className="px-6 py-3 rounded-full bg-white/15 dark:bg-white/8 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white/25 dark:hover:bg-white/15 hover:border-white/40 dark:hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Explore All Stories →
              </span>
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
