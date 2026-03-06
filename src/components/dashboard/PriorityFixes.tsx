import { AlertTriangle } from 'lucide-react'
import type { PriorityFix } from '../../types/review'

interface PriorityFixesProps {
  fixes: PriorityFix[]
}

export function PriorityFixes({ fixes }: PriorityFixesProps) {
  if (fixes.length === 0) return null

  return (
    <div className="rounded-lg border border-accent-fg/30 bg-accent-fg/5 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} className="text-accent-fg" />
        <p className="text-sm font-semibold text-accent-fg">Top 2 Priority Fixes</p>
      </div>
      {fixes.map((fix, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <p className="text-xs font-mono font-medium text-fg-default">{fix.parameter}</p>
          <p className="text-sm text-fg-muted">{fix.fix}</p>
        </div>
      ))}
    </div>
  )
}
