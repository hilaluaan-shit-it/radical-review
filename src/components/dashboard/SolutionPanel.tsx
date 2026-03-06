import { motion, AnimatePresence } from 'framer-motion'

interface SolutionPanelProps {
  isOpen: boolean
  challenge: string
  acknowledgment: string
  solution: string
}

export function SolutionPanel({ isOpen, challenge, acknowledgment, solution }: SolutionPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 gap-4 border-t border-border-muted px-4 pt-4 pb-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-danger-fg uppercase tracking-wide mb-1">Challenge</p>
              <p className="text-sm text-fg-default">{challenge}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-success-fg uppercase tracking-wide mb-1">Acknowledgment</p>
              <p className="text-sm text-fg-default">{acknowledgment}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-accent-fg uppercase tracking-wide mb-1">Solution</p>
              <p className="text-sm text-fg-default">{solution}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
