'use client'

import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'

interface LoadMoreButtonProps {
  onClick: () => void
  loading: boolean
}

export default function LoadMoreButton({
  onClick,
  loading,
}: LoadMoreButtonProps) {
  return (
    <Button onClick={onClick} disabled={loading} size="lg" variant="secondary">
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        'Load More Stories'
      )}
    </Button>
  )
}
