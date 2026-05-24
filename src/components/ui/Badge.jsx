import { motion } from 'framer-motion'
import { pillVariants } from '../../lib/motion'

const variants = {
  default: 'bg-card border-border text-text-secondary',
  accent: 'bg-accent-bg border-accent-border text-accent',
  success: 'bg-success-bg border-success/30 text-success',
  warning: 'bg-warning-bg border-warning/30 text-warning',
  danger: 'bg-danger-bg border-danger/30 text-danger',
}

export default function Badge({ children, variant = 'default', className = '', animate = true }) {
  const Component = animate ? motion.span : 'span'
  const motionProps = animate
    ? {
        initial: pillVariants.initial,
        animate: pillVariants.animate,
        transition: pillVariants.transition,
      }
    : {}

  return (
    <Component
      {...motionProps}
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  )
}
