import { motion } from 'framer-motion'
import { fadeIn } from '../../lib/animations'
import { useReviewStore } from '../../store/useReviewStore'
import { OverallScore } from './OverallScore'
import { PriorityFixes } from './PriorityFixes'
import { ReviewTable } from './ReviewTable'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { RotateCcw } from 'lucide-react'

export function AnalysisDashboard() {
  const result = useReviewStore((s) => s.reviewResult)
  const imagePreviewUrl = useReviewStore((s) => s.wizard.imagePreviewUrl)
  const imageName = useReviewStore((s) => s.wizard.imageFile?.name)
  const reset = useReviewStore((s) => s.reset)

  if (!result) return null

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Analysis Complete</h1>
          <p className="text-fg-muted mt-1 text-sm">Radical Candor Review — Key Visual Art Direction</p>
        </div>
        <Button variant="secondary" onClick={reset}>
          <RotateCcw size={14} />
          New Review
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col gap-6">
          <OverallScore score={result.averageScore} />
          <PriorityFixes fixes={result.priorityFixes} />
        </div>

        {imagePreviewUrl && (
          <Card className="flex flex-col gap-2 h-fit">
            <p className="text-xs font-medium text-fg-muted uppercase tracking-wide">Reviewed Image</p>
            <img
              src={imagePreviewUrl}
              alt="Reviewed Key Visual"
              className="rounded border border-border-muted object-contain max-h-[240px] w-full bg-canvas-inset"
            />
            {imageName && (
              <p className="text-xs text-fg-muted font-mono truncate">{imageName}</p>
            )}
          </Card>
        )}
      </div>

      <ReviewTable parameters={result.parameters} />
    </motion.div>
  )
}
