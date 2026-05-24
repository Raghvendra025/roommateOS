import { AnimatePresence, motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'
import { modalOverlayVariants, modalCardVariants } from '../../lib/motion'

export default function Modal({ open, onClose, children }) {
  const isMobile = useIsMobile()

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/60 dark:bg-black/70"
            onClick={onClose}
            initial={modalOverlayVariants.initial}
            animate={modalOverlayVariants.animate}
            exit={modalOverlayVariants.exit}
            transition={modalOverlayVariants.transition}
          />
          <motion.div
            className="relative w-full max-w-md rounded-[14px] border border-border bg-card p-6 shadow-card"
            initial={modalCardVariants(isMobile).initial}
            animate={modalCardVariants(isMobile).animate}
            exit={modalCardVariants(isMobile).exit}
            transition={modalCardVariants(isMobile).transition}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
