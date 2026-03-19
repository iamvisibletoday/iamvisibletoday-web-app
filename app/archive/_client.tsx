'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Loader2 } from 'lucide-react'
import { Story, ContentType } from '@/types/database'
import Container from '@/components/ui/Container'
import StoryCard from '@/components/archive/StoryCard'
import ArchiveFilters from '@/components/archive/ArchiveFilters'
import ArchiveEmptyState from '@/components/archive/ArchiveEmptyState'
import { getStories } from '@/lib/data/stories'

interface ArchivePageClientProps {
  initialStories: Story[]
  initialHasMore: boolean
  initialFilters: {
    search?: string
    contentType?: ContentType
  }
}

export default function ArchivePageClient({
  initialStories,
  initialHasMore,
  initialFilters,
}: ArchivePageClientProps) {
  const router = useRouter()

  const [stories, setStories] = useState(initialStories)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState(initialFilters)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const updateFilters = useCallback(
    (newFilters: typeof filters) => {
      const params = new URLSearchParams()
      if (newFilters.search) params.set('search', newFilters.search)
      if (newFilters.contentType) params.set('type', newFilters.contentType)

      const query = params.toString()
      router.push(`/archive${query ? `?${query}` : ''}`, { scroll: false })
      setFilters(newFilters)

      // Re-fetch stories with new filters
      setLoading(true)
      getStories(newFilters, { limit: 12 }).then(({ stories: newStories, hasMore: moreAvailable }) => {
        setStories(newStories)
        setHasMore(moreAvailable)
        setLoading(false)
      })
    },
    [router]
  )

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    const cursor = stories[stories.length - 1]?.published_date

    const { stories: newStories, hasMore: moreAvailable } = await getStories(
      filters,
      { limit: 12, cursor }
    )

    setStories([...stories, ...newStories])
    setHasMore(moreAvailable)
    setLoading(false)
  }

  // Setup infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, stories, filters])

  return (
    <>
      {/* Header */}
      <section className="py-8 md:py-12 bg-rose-50 dark:bg-dark-bg-secondary border-b border-rose-200 dark:border-dark-bg-tertiary">
        <Container maxWidth="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <BookOpen className="w-12 h-12 text-rose-500 dark:text-rose-400 mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-text-primary dark:text-dark-text-primary mb-4">
              Story Archive
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Browse moments of courage and visibility from our community
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-rose-200 dark:border-dark-bg-tertiary">
        <Container maxWidth="wide">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ArchiveFilters
              initialSearch={filters.search}
              initialContentType={filters.contentType}
              onFilterChange={updateFilters}
            />
          </motion.div>
        </Container>
      </section>

      {/* Story Grid */}
      <section className="py-12">
        <Container maxWidth="wide">
          {stories.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ArchiveEmptyState />
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, idx) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <StoryCard story={story} />
                  </motion.div>
                ))}
              </div>

              {/* Infinite scroll sentinel */}
              <div ref={sentinelRef} className="mt-12 flex justify-center">
                {loading && hasMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more stories...</span>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
