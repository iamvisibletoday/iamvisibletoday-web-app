import Link from 'next/link'
import Container from '../ui/Container'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-white dark:bg-dark-bg-secondary border-b border-rose-200 dark:border-dark-bg-tertiary sticky top-0 z-50 transition-colors duration-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl text-rose-500 dark:text-rose-400 group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300">♥</span>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">I am visible today!</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/archive"
              className="relative text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-rose-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="relative text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-rose-500 hover:after:w-full after:transition-all after:duration-300"
            >
              About
            </Link>
            <ThemeToggle />
            <Link
              href="/submit"
              className="px-4 py-2 bg-rose-500 dark:bg-rose-600 text-white rounded-lg hover:bg-rose-600 dark:hover:bg-rose-700 transition-colors"
            >
              Share Your Story
            </Link>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}