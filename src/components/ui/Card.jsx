import { cardBase, cardHover } from '../../lib/classes'

export default function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div className={`${hover ? cardHover : cardBase} ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-sm font-semibold text-text">{title}</h3>
        {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
