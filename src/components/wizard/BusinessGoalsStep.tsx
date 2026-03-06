import { useReviewStore } from '../../store/useReviewStore'
import { Card } from '../ui/Card'
import { TextArea } from '../ui/TextArea'
import { Button } from '../ui/Button'

export function BusinessGoalsStep() {
  const businessGoals = useReviewStore((s) => s.wizard.businessGoals)
  const setBusinessGoals = useReviewStore((s) => s.setBusinessGoals)
  const nextStep = useReviewStore((s) => s.nextStep)
  const prevStep = useReviewStore((s) => s.prevStep)

  return (
    <Card className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Business Goals</h2>
      <p className="text-sm text-fg-muted">
        Optionally provide conversion targets or business objectives. The AI will factor these into its review if provided.
      </p>

      <TextArea
        label="Conversion Targets / Business Goals (optional)"
        placeholder="e.g. Increase click-through rate by 15%, drive sign-ups for free trial, target audience: developers aged 25-40"
        value={businessGoals}
        onChange={(e) => setBusinessGoals(e.target.value)}
        className="min-h-[120px]"
      />

      <div className="flex justify-between pt-2">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </Card>
  )
}
