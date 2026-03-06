import { Image, LayoutTemplate, MonitorSmartphone } from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import type { FormatType } from '../../types/review'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

const FORMAT_OPTIONS: { value: FormatType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'banner',
    label: 'Banner',
    description: 'Web banners, hero images, and wide-format display ads',
    icon: <LayoutTemplate size={24} />,
  },
  {
    value: 'social-media',
    label: 'Social Media',
    description: 'Instagram posts, stories, Facebook covers, and feed content',
    icon: <MonitorSmartphone size={24} />,
  },
  {
    value: 'thumbnail',
    label: 'Thumbnail',
    description: 'YouTube thumbnails, article cards, and preview images',
    icon: <Image size={24} />,
  },
]

export function FormatSelectionStep() {
  const format = useReviewStore((s) => s.wizard.format)
  const setFormat = useReviewStore((s) => s.setFormat)
  const nextStep = useReviewStore((s) => s.nextStep)
  const prevStep = useReviewStore((s) => s.prevStep)

  return (
    <Card className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Format Selection</h2>
      <p className="text-sm text-fg-muted">
        Select the format context for your Key Visual. This shapes how the AI evaluates layout, hierarchy, and sizing.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {FORMAT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFormat(opt.value)}
            className={`flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors ${
              format === opt.value
                ? 'border-accent-fg bg-accent-fg/5'
                : 'border-border-default bg-canvas-inset hover:border-border-muted'
            }`}
          >
            <span className={format === opt.value ? 'text-accent-fg' : 'text-fg-muted'}>
              {opt.icon}
            </span>
            <span className="text-sm font-medium text-fg-default">{opt.label}</span>
            <span className="text-xs text-fg-muted">{opt.description}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={!format}>Next</Button>
      </div>
    </Card>
  )
}
