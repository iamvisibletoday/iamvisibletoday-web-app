'use client'

import { useSecureMediaUrl } from '@/lib/hooks/useSecureMediaUrl'

interface StoryPhotoContentProps {
  path: string
  caption?: string | null
  sessionToken: string
}

export default function StoryPhotoContent({
  path,
  caption,
  sessionToken,
}: StoryPhotoContentProps) {
  // Check if path is an external URL (for mock data compatibility)
  const isExternalUrl = path && (path.startsWith('http://') || path.startsWith('https://'))
  const { url } = useSecureMediaUrl(
    isExternalUrl ? null : 'photos',
    isExternalUrl ? null : path,
    sessionToken
  )

  // For external URLs, use them directly; for storage paths, use streaming endpoint
  const displayUrl = isExternalUrl ? path : url

  if (!displayUrl) {
    return (
      <figure className="my-8">
        <div className="w-full aspect-4/3 bg-slate-100 dark:bg-dark-bg-tertiary rounded-lg flex items-center justify-center">
          <p className="text-sm text-slate-500">Image unavailable</p>
        </div>
      </figure>
    )
  }

  const handleImageProtection = (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  return (
    <figure className="my-8">
      <div className="relative w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-dark-bg-tertiary">
        <img
          src={displayUrl}
          alt={caption || 'Story photo'}
          className="w-full h-auto object-cover max-h-[600px] select-none pointer-events-none"
          onContextMenu={handleImageProtection}
          onDragStart={handleImageProtection}
          onDragOver={handleImageProtection}
          draggable={false}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
