'use client'

import { useEffect } from 'react'

interface ContentProtectionProps {
  children: React.ReactNode
}

export default function ContentProtection({ children }: ContentProtectionProps) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'AUDIO' ||
        target.tagName === 'VIDEO' ||
        target.closest('[data-protected]')
      ) {
        e.preventDefault()
      }
    }

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.tagName === 'AUDIO') {
        e.preventDefault()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+S / Cmd+S (save page)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      data-protected
      className="select-none"
      style={{ WebkitUserSelect: 'none' }}
    >
      {children}
    </div>
  )
}
