import { motion } from 'framer-motion'

export default function ProgressBar({
  value,
  max = 100,
  className = '',
  animated = false,
  delay = 0.3,
  duration = 0.8,
}) {
  const pct = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className={`h-1.5 bg-border rounded-full overflow-hidden ${className}`}>
      {animated ? (
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration, ease: 'easeOut', delay }}
        />
      ) : (
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  )
}
