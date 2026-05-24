import { motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

const variants = {
  primary: 'bg-accent text-on-accent font-medium hover:bg-accent/90 shadow-lg shadow-accent/20',
  secondary: 'bg-card border border-border text-text hover:bg-card-hover hover:border-text-muted/30',
  ghost: 'text-text-secondary hover:text-text hover:bg-card',
  danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-2.5 text-sm rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const isMobile = useIsMobile()

  return (
    <motion.button
      whileHover={isMobile ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  )
}
