import { Loader2 } from 'lucide-react'

export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className="w-8 h-8 text-accent animate-spin" />
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
        <span className="text-danger text-xl">!</span>
      </div>
      <p className="text-sm text-danger text-center max-w-xs">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-xs text-accent hover:text-accent/80 underline"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      )}
      <div className="text-center">
        <p className="text-sm font-medium text-text">{title}</p>
        {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
