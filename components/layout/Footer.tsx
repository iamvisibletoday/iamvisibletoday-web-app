import Link from 'next/link'
import Container from '../ui/Container'

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-dark-bg-secondary border-t border-rose-200 dark:border-dark-bg-tertiary mt-20 transition-colors duration-200">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-display font-semibold text-lg text-text-primary dark:text-dark-text-primary mb-3">
                I Am Visible Today™
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed mb-4">
                A space for sharing moments of presence, courage, and being seen.
              </p>
              <a
                href="https://ko-fi.com/iamvisibletoday"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
              >
                <span>♥</span>
                <span>Support this project</span>
              </a>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-3">Navigate</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/archive" className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
                    All Stories
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
                    Share Your Story
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
                    Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-8 border-t border-rose-200 dark:border-dark-bg-tertiary text-center">
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-3">
              ⚠️ <strong>Important:</strong> This platform is not a substitute for professional mental health care.
              If you&apos;re in crisis, please call{' '}
              <a
                href="tel:988"
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium hover:underline transition-colors"
              >
                988
              </a>
              {' '}(US),{' '}
              <a
                href="tel:+1-833-456-4566"
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium hover:underline transition-colors"
              >
                1-833-456-4566
              </a>
              {' '}(Canada), or visit{' '}
              <a
                href="https://findahelpline.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium hover:underline transition-colors"
              >
                findahelpline.com
              </a>
              {' '}(International).
            </p>
            <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mb-2 text-center">
              Co-authored with{' '}
              <a
                href="https://claude.com/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline transition-colors"
              >
                Claude Code
              </a>
              . Source code{' '}
              <a
                href="https://github.com/iamvisibletoday/iamvisibletoday-web-app.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline transition-colors"
              >
                open sourced on GitHub
              </a>
              {' '}(AGPL-3.0). Hosted on{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline transition-colors"
              >
                Vercel
              </a>.
            </p>
            <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary text-center">
              © 2026 I Am Visible Today™. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}