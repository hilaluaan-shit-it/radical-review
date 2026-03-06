import { AnimatePresence, motion } from 'framer-motion'
import { slideUp } from '../../lib/animations'
import { useReviewStore } from '../../store/useReviewStore'
import { ProgressBar } from '../ui/ProgressBar'
import { BrandGuidelinesStep } from './BrandGuidelinesStep'
import { FormatSelectionStep } from './FormatSelectionStep'
import { BusinessGoalsStep } from './BusinessGoalsStep'
import { ImageUploadStep } from './ImageUploadStep'

const STEP_LABELS = ['Brand Guidelines', 'Format', 'Business Goals', 'Upload']

interface WizardShellProps {
  onSubmit: () => void
}

export function WizardShell({ onSubmit }: WizardShellProps) {
  const currentStep = useReviewStore((s) => s.wizard.currentStep)

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BrandGuidelinesStep />
      case 2: return <FormatSelectionStep />
      case 3: return <BusinessGoalsStep />
      case 4: return <ImageUploadStep onSubmit={onSubmit} />
      default: return null
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Radical Review</h1>
        <p className="text-fg-muted mt-1 text-sm">Key Visual AI Art Director</p>
      </div>

      <ProgressBar currentStep={currentStep} totalSteps={4} />

      <p className="text-sm text-fg-muted">
        Step {currentStep} of 4 — {STEP_LABELS[currentStep - 1]}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
