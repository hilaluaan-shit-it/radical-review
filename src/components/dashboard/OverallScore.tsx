import { motion } from 'framer-motion'
import { scaleIn } from '../../lib/animations'
import { getScoreColor } from './ScoreCell'
import { Card } from '../ui/Card'

interface OverallScoreProps {
  score: number
}

export function OverallScore({ score }: OverallScoreProps) {
  return (
    <Card className="flex items-center gap-6">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className={`text-5xl font-bold font-mono ${getScoreColor(score)}`}
      >
        {score.toFixed(1)}
      </motion.div>
      <div>
        <p className="text-sm font-medium text-fg-default">Overall Score</p>
        <p className="text-xs text-fg-muted">Average across 6 parameters (out of 5.0)</p>
      </div>
    </Card>
  )
}
