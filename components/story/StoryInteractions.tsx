'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Handshake } from 'lucide-react'
import { incrementViewCount, incrementRelateCount } from '@/lib/data/stories'

interface StoryInteractionsProps {
  slug: string
  initialSeenCount: number
  initialRelateCount: number
}

export default function StoryInteractions({
  slug,
  initialSeenCount,
  initialRelateCount,
}: StoryInteractionsProps) {
  const [seen, setSeen] = useState(false)
  const [related, setRelated] = useState(false)
  const [seenCount, setSeenCount] = useState(initialSeenCount)
  const [relateCount, setRelateCount] = useState(initialRelateCount)

  const handleSeen = () => {
    if (seen) return
    setSeen(true)
    setSeenCount((c) => c + 1)
    incrementViewCount(slug)
  }

  const handleRelate = () => {
    if (related) return
    setRelated(true)
    setRelateCount((c) => c + 1)
    incrementRelateCount(slug)
  }

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={handleSeen}
        className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
          seen
            ? 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400'
            : 'border-slate-200 dark:border-dark-bg-tertiary text-text-secondary dark:text-dark-text-secondary hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-500 dark:hover:text-rose-400'
        }`}
        aria-label={seen ? 'You marked this as seen' : 'Mark as seen'}
      >
        <AnimatePresence mode="wait">
          {seen ? (
            <motion.div
              key="seen-active"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Eye className="w-5 h-5" />
            </motion.div>
          ) : (
            <Eye className="w-5 h-5 transition-transform group-hover:scale-110" />
          )}
        </AnimatePresence>
        <span className="text-sm font-medium">
          {seen ? 'Seen' : 'I See You'}
        </span>
        <span className="text-xs opacity-70">{seenCount}</span>
      </button>

      <button
        onClick={handleRelate}
        className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
          related
            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
            : 'border-slate-200 dark:border-dark-bg-tertiary text-text-secondary dark:text-dark-text-secondary hover:border-amber-300 dark:hover:border-amber-700 hover:text-amber-500 dark:hover:text-amber-400'
        }`}
        aria-label={related ? 'You related to this story' : 'I relate to this'}
      >
        <AnimatePresence mode="wait">
          {related ? (
            <motion.div
              key="relate-active"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Handshake className="w-5 h-5" />
            </motion.div>
          ) : (
            <Handshake className="w-5 h-5 transition-transform group-hover:scale-110" />
          )}
        </AnimatePresence>
        <span className="text-sm font-medium">
          {related ? 'Related' : 'I Relate'}
        </span>
        <span className="text-xs opacity-70">{relateCount}</span>
      </button>
    </div>
  )
}
