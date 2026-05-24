import { motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'
import { pageTransition } from '../../lib/motion'

export default function PageMotion({ children, className = '' }) {
  const isMobile = useIsMobile()
  const transition = pageTransition(isMobile)

  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      transition={transition.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
