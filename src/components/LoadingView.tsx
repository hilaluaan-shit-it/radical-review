import { motion } from 'framer-motion'

export function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-border-default border-t-accent-fg"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <div className="text-center">
        <p className="text-lg font-semibold text-fg-default">Analyzing your Key Visual...</p>
        <p className="text-sm text-fg-muted mt-1">
          Running Radical Candor review across 6 parameters
        </p>
      </div>
    </div>
  )
}
