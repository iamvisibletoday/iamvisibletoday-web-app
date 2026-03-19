import { FileText, Image, Mic, Layers } from 'lucide-react'
import { ContentType } from '@/types/database'

interface ContentTypeBadgeProps {
  type: ContentType
}

const badges: Record<
  ContentType,
  { icon: typeof FileText; label: string; color: string }
> = {
  text: {
    icon: FileText,
    label: 'Text',
    color:
      'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  },
  photo: {
    icon: Image,
    label: 'Photo',
    color:
      'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
  },
  voice: {
    icon: Mic,
    label: 'Voice',
    color:
      'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  },
  combined: {
    icon: Layers,
    label: 'Mixed',
    color:
      'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400',
  },
}

export default function ContentTypeBadge({ type }: ContentTypeBadgeProps) {
  const badge = badges[type]
  const Icon = badge.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${badge.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {badge.label}
    </span>
  )
}
