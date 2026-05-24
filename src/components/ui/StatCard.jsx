import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cardBase } from '../../lib/classes'
import useIsMobile from '../../hooks/useIsMobile'
import AnimatedNumber from '../shared/AnimatedNumber'

export default function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  numericValue,
  numericPrefix = '₹',
  numericDecimals = 0,
  variants,
}) {
  const isMobile = useIsMobile()
  const isPositive = trend === 'up'

  const content = (
    <div className={`${cardBase} p-6 relative border border-border hover:border-accent/30 transition-colors duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-semibold text-text mt-1 tracking-tight">
            {numericValue != null ? (
              <AnimatedNumber
                value={numericValue}
                prefix={numericPrefix}
                decimals={numericDecimals}
                duration={1200}
              />
            ) : (
              value
            )}
          </p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20">
            <Icon className="w-4 h-4 text-accent" />
          </div>
        )}
      </div>
    </div>
  )

  if (variants) {
    return (
      <motion.div
        variants={variants}
        whileHover={isMobile ? undefined : { scale: 1.01 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
