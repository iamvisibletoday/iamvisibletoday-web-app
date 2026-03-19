import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { StoryLink } from '@/types/database'

interface StoryNavigationProps {
  previous: StoryLink | null
  next: StoryLink | null
}

export default function StoryNavigation({
  previous,
  next,
}: StoryNavigationProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      {previous ? (
        <Link
          href={`/story/${previous.slug}`}
          className="flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <div>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              Previous
            </p>
            <p className="font-medium text-sm">{previous.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/story/${next.slug}`}
          className="flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors text-right group"
        >
          <div>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              Next
            </p>
            <p className="font-medium text-sm">{next.title}</p>
          </div>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
