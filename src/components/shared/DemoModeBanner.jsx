import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../../context/DemoContext'

export default function DemoModeBanner() {
  const { isDemo, exitDemo } = useDemo()
  const navigate = useNavigate()

  const handleExit = () => {
    exitDemo()
    navigate('/login')
  }

  return (
    <AnimatePresence>
      {isDemo && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 py-2.5
                     bg-gradient-to-r from-amber-500/90 to-orange-500/90
                     backdrop-blur-md border-b border-amber-400/30 shadow-lg shadow-amber-500/10"
        >
          {/* Left: label */}
          <div className="flex items-center gap-2 text-white">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-semibold tracking-wide">Demo Mode</span>
            <span className="hidden sm:inline text-xs text-amber-100/80">
              — Exploring with sample data. Nothing is saved.
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         bg-white/20 hover:bg-white/30 text-white text-xs font-medium
                         transition-colors border border-white/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign up / Log in</span>
            </button>
            <button
              type="button"
              onClick={handleExit}
              aria-label="Exit demo"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
