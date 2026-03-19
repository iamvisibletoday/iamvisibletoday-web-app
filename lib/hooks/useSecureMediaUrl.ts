import { useMemo } from 'react'

/**
 * Hook to generate streaming URLs for media files
 * Uses server-side streaming endpoint that never exposes URLs to clients
 * Prevents bot scraping and URL sharing
 * Access control enforced on server: published stories public, submissions admin-only
 *
 * Session tokens ensure URLs only work within the current page session
 */
export function useSecureMediaUrl(
  bucket: 'photos' | 'voice-notes' | null,
  path: string | null,
  sessionToken?: string
): { url: string | null; loading: boolean; error: string | null } {
  // Generate streaming URL with session token - verified server-side on each request
  const url = useMemo(() => {
    if (!bucket || !path) return null
    const baseUrl = `/api/media/stream?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(path)}`
    if (sessionToken) {
      return `${baseUrl}&token=${encodeURIComponent(sessionToken)}`
    }
    return baseUrl
  }, [bucket, path, sessionToken])

  // No async operations needed - endpoint handles verification
  return { url, loading: false, error: null }
}
