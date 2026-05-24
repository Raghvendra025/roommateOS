const sizes = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
}

export default function Avatar({ initials, size = 'md', className = '' }) {
  const colors = [
    'bg-accent/20 text-accent',
    'bg-success/20 text-success',
    'bg-warning/20 text-warning',
    'bg-danger/20 text-danger',
  ]
  const colorIndex = (initials?.charCodeAt(0) || 0) % colors.length

  return (
    <div
      className={`${sizes[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center font-semibold shrink-0 ${className}`}
    >
      {initials}
    </div>
  )
}
