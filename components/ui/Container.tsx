import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'content' | 'full' | 'wide'
}

export default function Container({ 
  children, 
  className = '',
  maxWidth = 'full' 
}: ContainerProps) {
  const maxWidthClass = {
    content: 'max-w-content',
    wide: 'max-w-4xl',
    full: 'max-w-7xl'
  }[maxWidth]

  return (
    <div className={`${maxWidthClass} mx-auto px-6 ${className}`}>
      {children}
    </div>
  )
}