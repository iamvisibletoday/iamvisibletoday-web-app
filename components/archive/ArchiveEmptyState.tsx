import Link from 'next/link'
import { Search } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function ArchiveEmptyState() {
  return (
    <Card className="text-center p-12 bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800">
      <Search className="w-16 h-16 text-rose-300 dark:text-rose-700 mx-auto mb-4" />
      <h3 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-3">
        No Stories Found
      </h3>
      <p className="text-text-secondary dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
        We couldn&apos;t find any stories matching your search. Try adjusting
        your filters or be the first to share.
      </p>
      <Link href="/submit">
        <Button>Share Your Story</Button>
      </Link>
    </Card>
  )
}
