'use client'

import { Volume2 } from 'lucide-react'
import { useSecureMediaUrl } from '@/lib/hooks/useSecureMediaUrl'

interface StoryVoiceContentProps {
  path: string
  sessionToken: string
}

export default function StoryVoiceContent({ path, sessionToken }: StoryVoiceContentProps) {
  // Check if path is an external URL or local path (for mock data compatibility)
  const isExternalUrl = path && (path.startsWith('http://') || path.startsWith('https://'))
  const { url } = useSecureMediaUrl(
    isExternalUrl ? null : 'voice-notes',
    isExternalUrl ? null : path,
    sessionToken
  )

  // For external/local URLs, use them directly; for storage paths, use streaming endpoint
  const displayUrl = isExternalUrl ? path : url

  return (
    <div className="my-8 p-6 bg-rose-50 dark:bg-rose-900/10 rounded-lg border border-rose-200 dark:border-rose-800">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
        <h3 className="font-display text-lg text-text-primary dark:text-dark-text-primary">
          Voice Note
        </h3>
      </div>

      {displayUrl ? (
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <audio
            controls
            className="w-full select-none"
            preload="metadata"
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onDragStart={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            draggable={false}
          >
            <source src={displayUrl} type="audio/webm" />
            <source src={displayUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Audio unavailable</p>
      )}
    </div>
  )
}
