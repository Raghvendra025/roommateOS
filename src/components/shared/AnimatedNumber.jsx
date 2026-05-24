import { useEffect, useState } from 'react'

export default function AnimatedNumber({
  value,
  prefix = '₹',
  suffix = '',
  duration = 1200,
  className = '',
  decimals = 0,
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const target = Number(value) || 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setDisplay(target)
        clearInterval(timer)
      } else {
        setDisplay(decimals > 0 ? start : Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [value, duration, decimals])

  const formatted =
    decimals > 0
      ? display.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(display).toLocaleString('en-IN')

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
