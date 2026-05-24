export default function Input({ label, icon: Icon, className = '', ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-text-secondary">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        )}
        <input
          className={`w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all ${Icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
    </div>
  )
}
