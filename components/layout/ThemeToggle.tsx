'use client'

import { useState, useLayoutEffect } from 'react'

function getInitialTheme(): 'light' | 'dark' {
  if (globalThis.window === undefined) return 'light'
  const stored = globalThis.localStorage.getItem('theme') as 'light' | 'dark' | null
  // Always default to light theme, unless user has previously selected dark
  return stored || 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useLayoutEffect(() => {
    const initialTheme = getInitialTheme()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-slate-100 dark:hover:bg-dark-bg-tertiary transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        // Moon icon (switch to dark)
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // Sun icon (switch to light)
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}