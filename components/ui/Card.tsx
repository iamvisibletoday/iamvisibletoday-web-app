import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`
        bg-white dark:bg-dark-bg-tertiary rounded-lg shadow-sm border border-rose-100 dark:border-dark-bg-tertiary p-6
        ${hover ? 'hover:shadow-lg hover:border-rose-300 dark:hover:border-rose-700 hover:-translate-y-1 transition-all duration-300' : ''}
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </div>
  )
}