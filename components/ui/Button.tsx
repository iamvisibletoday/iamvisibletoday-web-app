import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap'

  const variants = {
    primary: 'bg-rose-500 dark:bg-rose-600 text-white hover:bg-rose-600 dark:hover:bg-rose-700 active:bg-rose-700 dark:active:bg-rose-800 hover:shadow-lg active:shadow-md',
    secondary: 'bg-rose-100 dark:bg-dark-bg-tertiary text-rose-700 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/30 active:bg-rose-300 dark:active:bg-rose-900/50 hover:shadow-md',
    ghost: 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 active:bg-rose-100 dark:active:bg-rose-900/30'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}