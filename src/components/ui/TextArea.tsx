import { type TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function TextArea({ label, error, className = '', id, ...props }: TextAreaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-fg-default">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`rounded-lg border bg-canvas-inset px-3 py-2 text-sm text-fg-default placeholder:text-fg-muted focus:border-accent-fg focus:outline-none focus:ring-1 focus:ring-accent-fg resize-y min-h-[80px] ${error ? 'border-danger-fg' : 'border-border-default'} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-danger-fg">{error}</p>}
    </div>
  )
}
