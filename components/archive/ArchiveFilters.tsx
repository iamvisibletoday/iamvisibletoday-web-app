'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { ContentType } from '@/types/database'
import Button from '@/components/ui/Button'

interface ArchiveFiltersProps {
  initialSearch?: string
  initialContentType?: ContentType
  onFilterChange: (filters: {
    search?: string
    contentType?: ContentType
  }) => void
}

const contentTypes: { value: ContentType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'photo', label: 'Photo' },
  { value: 'voice', label: 'Voice' },
  { value: 'combined', label: 'Mixed' },
]

export default function ArchiveFilters({
  initialSearch,
  initialContentType,
  onFilterChange,
}: ArchiveFiltersProps) {
  const [search, setSearch] = useState(initialSearch || '')
  const [contentType, setContentType] = useState<ContentType | undefined>(
    initialContentType
  )
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const isFirstRender = useRef(true)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  // Update filters when debounced search or content type changes
  useEffect(() => {
    // Skip the initial render to avoid double-fetching
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onFilterChange({
      search: debouncedSearch || undefined,
      contentType,
    })
    // onFilterChange is stable from the parent's useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, contentType])

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-rose-200 dark:border-dark-bg-tertiary bg-white dark:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 transition-shadow"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content Type Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={contentType === undefined ? 'primary' : 'ghost'}
          onClick={() => setContentType(undefined)}
        >
          All Types
        </Button>
        {contentTypes.map((type) => (
          <Button
            key={type.value}
            size="sm"
            variant={contentType === type.value ? 'primary' : 'ghost'}
            onClick={() =>
              setContentType(
                contentType === type.value ? undefined : type.value
              )
            }
          >
            {type.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
