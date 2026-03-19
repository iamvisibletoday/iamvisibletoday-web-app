'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import StoryDeleteModal from './StoryDeleteModal'

interface DeleteStoryButtonProps {
  slug: string
  title: string
  onDeleteComplete: () => void
}

export default function DeleteStoryButton({
  slug,
  title,
  onDeleteComplete,
}: DeleteStoryButtonProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setShowModal(true)}
        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Delete
      </Button>

      {showModal && (
        <StoryDeleteModal
          slug={slug}
          title={title}
          onClose={() => setShowModal(false)}
          onDeleteComplete={() => {
            setShowModal(false)
            onDeleteComplete()
          }}
        />
      )}
    </>
  )
}
