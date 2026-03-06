import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-fg-default">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`rounded-lg border bg-canvas-inset px-3 py-2 text-sm text-fg-default placeholder:text-fg-muted focus:border-accent-fg focus:outline-none focus:ring-1 focus:ring-accent-fg ${error ? 'border-danger-fg' : 'border-border-default'} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-danger-fg">{error}</p>}
    </div>
  )
}
