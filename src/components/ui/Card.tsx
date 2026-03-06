import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border-default bg-canvas-subtle p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
