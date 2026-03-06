export function getScoreColor(score: number): string {
  if (score >= 4.0) return 'text-success-fg'
  if (score >= 2.5) return 'text-attention-fg'
  return 'text-danger-fg'
}

interface ScoreCellProps {
  score: number
}

export function ScoreCell({ score }: ScoreCellProps) {
  return (
    <span className={`font-mono font-semibold text-lg ${getScoreColor(score)}`}>
      {score.toFixed(1)}
    </span>
  )
}
