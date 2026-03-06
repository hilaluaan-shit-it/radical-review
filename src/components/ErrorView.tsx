import { AlertTriangle } from 'lucide-react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { useReviewStore } from '../store/useReviewStore'

interface ErrorViewProps {
  message: string
  onRetry: () => void
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  const reset = useReviewStore((s) => s.reset)

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32">
      <Card className="max-w-md w-full flex flex-col items-center gap-4 text-center">
        <AlertTriangle size={32} className="text-danger-fg" />
        <div>
          <p className="text-lg font-semibold text-fg-default">Review Failed</p>
          <p className="text-sm text-fg-muted mt-1">{message}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={reset}>Start Over</Button>
          <Button onClick={onRetry}>Retry</Button>
        </div>
      </Card>
    </div>
  )
}
