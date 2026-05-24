import { motion } from 'framer-motion'

export default function Skeleton({ className = '' }) {
  return (
    <motion.div
      className={`bg-card-hover rounded-lg ${className}`}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
