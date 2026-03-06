import { type HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'attention' | 'danger'
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const variants = {
    default: 'border-border-default text-fg-muted',
    success: 'border-success-fg/40 text-success-fg',
    attention: 'border-attention-fg/40 text-attention-fg',
    danger: 'border-danger-fg/40 text-danger-fg',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
