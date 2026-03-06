import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { staggerChildren, slideUp } from '../../lib/animations'
import type { ReviewParameter } from '../../types/review'
import { ScoreCell } from './ScoreCell'
import { SolutionPanel } from './SolutionPanel'

interface ReviewTableProps {
  parameters: ReviewParameter[]
}

export function ReviewTable({ parameters }: ReviewTableProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i)
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-fg-muted uppercase tracking-wide mb-2">
        Parameter Breakdown
      </p>

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2"
      >
        {parameters.map((param, i) => (
          <motion.div
            key={param.name}
            variants={slideUp}
            className="rounded-lg border border-border-default bg-canvas-subtle overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-canvas-inset/50 transition-colors"
            >
              <ScoreCell score={param.score} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-fg-default">{param.name}</p>
                <p className="text-xs text-fg-muted truncate">{param.verdict}</p>
              </div>
              <ChevronDown
                size={16}
                className={`text-fg-muted shrink-0 transition-transform ${
                  expandedIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>

            <SolutionPanel
              isOpen={expandedIndex === i}
              challenge={param.challenge}
              acknowledgment={param.acknowledgment}
              solution={param.solution}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
