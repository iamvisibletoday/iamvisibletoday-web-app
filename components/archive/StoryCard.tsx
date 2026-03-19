import Link from 'next/link'
import { Story } from '@/types/database'
import Card from '@/components/ui/Card'
import ContentTypeBadge from './ContentTypeBadge'
import { formatDate, estimateReadingTime, countWords } from '@/lib/utils/format'

interface StoryCardProps {
  story: Story
}

export default function StoryCard({ story }: StoryCardProps) {
  const preview =
    story.text_content?.substring(0, 150) ||
    story.photo_caption?.substring(0, 150) ||
    ''
  const readingTime = story.text_content
    ? estimateReadingTime(countWords(story.text_content))
    : null

  return (
    <Link href={`/story/${story.slug}`} className="block h-full">
      <Card hover className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <ContentTypeBadge type={story.content_type} />
          {story.has_content_warning && (
            <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded font-medium">
              CW
            </span>
          )}
        </div>

        <h3 className="font-display text-xl text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2">
          {story.title}
        </h3>

        {preview && (
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-3 flex-grow">
            {preview}...
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-rose-100 dark:border-dark-bg-tertiary mt-auto">
          <span>{formatDate(story.published_date)}</span>
          {readingTime && <span>{readingTime} min read</span>}
        </div>
      </Card>
    </Link>
  )
}
