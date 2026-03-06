import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-fg focus:ring-offset-2 focus:ring-offset-canvas-default disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-accent-fg text-canvas-default hover:bg-accent-fg/90',
    secondary: 'border border-border-default bg-transparent text-fg-default hover:bg-canvas-subtle',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
