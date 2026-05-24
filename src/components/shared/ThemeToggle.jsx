import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      className="relative w-[52px] h-[28px] rounded-full border border-border bg-card-hover flex items-center px-1 shrink-0"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-5 h-5 rounded-full bg-card flex items-center justify-center shadow-sm border border-border"
      >
        {isDark ? (
          <Moon className="w-[11px] h-[11px] text-accent" />
        ) : (
          <Sun className="w-[11px] h-[11px] text-warning" />
        )}
      </motion.div>
    </motion.button>
  )
}
