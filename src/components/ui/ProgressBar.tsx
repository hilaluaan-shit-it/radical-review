interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isCurrent = step === currentStep

        return (
          <div key={step} className="flex items-center gap-2 flex-1">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-mono font-medium transition-colors ${
                isCurrent
                  ? 'border-accent-fg bg-accent-fg text-canvas-default'
                  : isCompleted
                    ? 'border-success-fg bg-success-fg/10 text-success-fg'
                    : 'border-border-default bg-canvas-inset text-fg-muted'
              }`}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div
                className={`h-px flex-1 transition-colors ${
                  isCompleted ? 'bg-success-fg' : 'bg-border-default'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
