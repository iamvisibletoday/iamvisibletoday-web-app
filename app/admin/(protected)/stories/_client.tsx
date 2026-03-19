'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Trash2,
  Search,
  AlertCircle,
  Loader,
  Eye,
  EyeOff,
  ChevronDown,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/format'
import StoryDeletionModal from '@/components/admin/StoryDeletionModal'

interface Story {
  id: string
  slug: string
  title: string
  content_type: 'text' | 'photo' | 'voice' | 'combined'
  published_date: string
  view_count: number
  deleted_at: string | null
  deletion_reason: string | null
  has_content_warning: boolean
  warning_text: string | null
}

export default function StoriesClient() {
  const [stories, setStories] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleted, setShowDeleted] = useState(false)
  const [sortBy, setSortBy] = useState<'published_date' | 'view_count'>(
    'published_date'
  )
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [deletionModal, setDeletionModal] = useState<{
    isOpen: boolean
    story: Story | null
  }>({ isOpen: false, story: null })
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    fetchStories()
  }, [showDeleted])

  const fetchStories = async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams({
        showDeleted: showDeleted.toString(),
        sortBy,
        order: sortOrder,
      })

      const response = await fetch(`/api/admin/stories?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch stories')
      }

      setStories(data.stories || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStories([])
    } finally {
      setLoading(false)
    }
  }

  // Filter stories based on search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredStories(stories)
      return
    }

    const query = searchQuery.toLowerCase()
    setFilteredStories(
      stories.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.slug.toLowerCase().includes(query)
      )
    )
  }, [stories, searchQuery])

  const handleDelete = async (
    story: Story,
    deletionType: 'soft' | 'hard',
    reason?: string
  ) => {
    try {
      setProcessingId(story.id)
      const response = await fetch('/api/admin/stories/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: story.slug,
          deletionType,
          reason: reason || 'Deleted by admin',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete story')
      }

      // Refresh stories list
      await fetchStories()
      setDeletionModal({ isOpen: false, story: null })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setProcessingId(null)
    }
  }

  const contentTypeColor: Record<string, string> = {
    text: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    photo: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    voice: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    combined: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  }

  return (
    <Container>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl md:text-4xl text-text-primary dark:text-dark-text-primary mb-2">
            Stories Management
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            View and manage all stories in the archive
          </p>
        </motion.div>

        {error && (
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="p-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
              <input
                type="text"
                placeholder="Search stories by title or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              onClick={() => setShowDeleted(!showDeleted)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showDeleted
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-100 dark:bg-dark-bg-tertiary text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-dark-bg-secondary'
              }`}
            >
              {showDeleted ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              {showDeleted ? 'Show All' : 'Show Deleted'}
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 flex-wrap">
            <div className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary pt-2">
              Sort by:
            </div>
            {(
              [
                { value: 'published_date', label: 'Published Date' },
                { value: 'view_count', label: 'View Count' },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === option.value
                    ? 'bg-rose-500 text-white'
                    : 'bg-rose-100 dark:bg-dark-bg-tertiary text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-dark-bg-secondary'
                }`}
              >
                {option.label}
              </button>
            ))}

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-rose-100 dark:bg-dark-bg-tertiary text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-dark-bg-secondary transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sortOrder === 'asc' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card>
            <div className="flex items-center justify-center py-12 gap-2">
              <Loader className="w-5 h-5 animate-spin text-rose-500" />
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Loading stories...
              </p>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!loading && filteredStories.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Trash2 className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-text-secondary dark:text-dark-text-secondary">
                {stories.length === 0
                  ? 'No stories found'
                  : 'No stories match your search'}
              </p>
            </div>
          </Card>
        )}

        {/* Stories List */}
        <div className="space-y-4">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Card
                className={`space-y-4 ${
                  story.deleted_at
                    ? 'bg-slate-50 dark:bg-dark-bg-tertiary/50 opacity-75'
                    : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                        {story.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          contentTypeColor[story.content_type]
                        }`}
                      >
                        {story.content_type}
                      </span>
                      {story.deleted_at && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                          Deleted
                        </span>
                      )}
                      {story.has_content_warning && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                          ⚠️ Warning
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Slug: <code className="text-xs">{story.slug}</code>
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">
                      Published
                    </p>
                    <p className="text-text-primary dark:text-dark-text-primary">
                      {formatDate(story.published_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">
                      Views
                    </p>
                    <p className="text-text-primary dark:text-dark-text-primary">
                      {story.view_count}
                    </p>
                  </div>

                  {story.deleted_at && (
                    <>
                      <div>
                        <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">
                          Deleted
                        </p>
                        <p className="text-text-primary dark:text-dark-text-primary">
                          {formatDate(story.deleted_at)}
                        </p>
                      </div>
                      {story.deletion_reason && (
                        <div className="md:col-span-1">
                          <p className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary uppercase">
                            Reason
                          </p>
                          <p className="text-text-primary dark:text-dark-text-primary text-xs">
                            {story.deletion_reason.substring(0, 30)}...
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {story.warning_text && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-900">
                    <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">
                      Content Warning
                    </p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      {story.warning_text}
                    </p>
                  </div>
                )}

                {story.deletion_reason && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-900">
                    <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">
                      Deletion Reason
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {story.deletion_reason}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-rose-100 dark:border-dark-bg-tertiary">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      setDeletionModal({ isOpen: true, story })
                    }
                    disabled={processingId === story.id}
                    className="flex-1"
                  >
                    {processingId === story.id ? 'Processing...' : 'Delete'}
                  </Button>
                  {story.deleted_at ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      title="Deleted stories are not publicly visible"
                      className="flex-1"
                    >
                      Hidden
                    </Button>
                  ) : (
                    <a
                      href={`/story/${story.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                      >
                        View
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deletion Modal */}
      {deletionModal.isOpen && deletionModal.story && (
        <StoryDeletionModal
          story={deletionModal.story}
          onDelete={handleDelete}
          onClose={() => setDeletionModal({ isOpen: false, story: null })}
          isProcessing={processingId === deletionModal.story.id}
        />
      )}
    </Container>
  )
}
