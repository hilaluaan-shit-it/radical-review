import { AnimatePresence, motion } from 'framer-motion'
import { fadeIn } from './lib/animations'
import { useReviewStore } from './store/useReviewStore'
import { runReview } from './lib/reviewEngine'
import { WizardShell } from './components/wizard/WizardShell'
import { AnalysisDashboard } from './components/dashboard/AnalysisDashboard'
import { LoadingView } from './components/LoadingView'
import { ErrorView } from './components/ErrorView'

function App() {
  const reviewResult = useReviewStore((s) => s.reviewResult)
  const isLoading = useReviewStore((s) => s.isLoading)
  const error = useReviewStore((s) => s.error)
  const wizard = useReviewStore((s) => s.wizard)
  const setLoading = useReviewStore((s) => s.setLoading)
  const setReviewResult = useReviewStore((s) => s.setReviewResult)
  const setError = useReviewStore((s) => s.setError)

  const handleSubmit = async () => {
    if (!wizard.imageFile || !wizard.format) return

    setLoading(true)
    try {
      const result = await runReview({
        imageFile: wizard.imageFile,
        brandGuidelines: wizard.brandGuidelines,
        format: wizard.format,
        businessGoals: wizard.businessGoals,
      })
      setReviewResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  const view = reviewResult ? 'dashboard' : isLoading ? 'loading' : error ? 'error' : 'wizard'

  return (
    <div className="min-h-screen bg-canvas-default text-fg-default font-body">
      <main className="mx-auto max-w-[960px] px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'wizard' && (
            <motion.div key="wizard" variants={fadeIn} initial="hidden" animate="visible" exit="hidden">
              <WizardShell onSubmit={handleSubmit} />
            </motion.div>
          )}

          {view === 'loading' && (
            <motion.div key="loading" variants={fadeIn} initial="hidden" animate="visible" exit="hidden">
              <LoadingView />
            </motion.div>
          )}

          {view === 'error' && (
            <motion.div key="error" variants={fadeIn} initial="hidden" animate="visible" exit="hidden">
              <ErrorView message={error!} onRetry={handleSubmit} />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div key="dashboard" variants={fadeIn} initial="hidden" animate="visible" exit="hidden">
              <AnalysisDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
