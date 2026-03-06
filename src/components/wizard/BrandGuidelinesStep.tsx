import { useState } from 'react'
import { useReviewStore } from '../../store/useReviewStore'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'
import { TextArea } from '../ui/TextArea'
import { Button } from '../ui/Button'

export function BrandGuidelinesStep() {
  const { brandGuidelines } = useReviewStore((s) => s.wizard)
  const setBrandGuidelines = useReviewStore((s) => s.setBrandGuidelines)
  const nextStep = useReviewStore((s) => s.nextStep)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!brandGuidelines.primaryColors.trim()) newErrors.primaryColors = 'Required'
    if (!brandGuidelines.typographyRules.trim()) newErrors.typographyRules = 'Required'
    if (!brandGuidelines.toneVoice.trim()) newErrors.toneVoice = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) nextStep()
  }

  return (
    <Card className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Brand Guidelines</h2>
      <p className="text-sm text-fg-muted">
        Define the technical baseline for your brand. The AI will evaluate your Key Visual against these rules.
      </p>

      <Input
        label="Primary Brand Colors"
        placeholder="e.g. #1A73E8, #FBBC04, #34A853"
        value={brandGuidelines.primaryColors}
        onChange={(e) => setBrandGuidelines({ primaryColors: e.target.value })}
        error={errors.primaryColors}
      />

      <Input
        label="Typography Rules"
        placeholder="e.g. Headings: Inter Bold 24px, Body: Inter Regular 14px"
        value={brandGuidelines.typographyRules}
        onChange={(e) => setBrandGuidelines({ typographyRules: e.target.value })}
        error={errors.typographyRules}
      />

      <Input
        label="Tone / Voice"
        placeholder="e.g. Professional, approachable, tech-forward"
        value={brandGuidelines.toneVoice}
        onChange={(e) => setBrandGuidelines({ toneVoice: e.target.value })}
        error={errors.toneVoice}
      />

      <TextArea
        label="Additional Constraints (optional)"
        placeholder="e.g. Must include logo in top-left, minimum contrast ratio 4.5:1"
        value={brandGuidelines.additionalConstraints}
        onChange={(e) => setBrandGuidelines({ additionalConstraints: e.target.value })}
      />

      <div className="flex justify-end pt-2">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </Card>
  )
}
