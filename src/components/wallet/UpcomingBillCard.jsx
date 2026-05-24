import { Home, Zap, Wifi, Droplets } from 'lucide-react'

const iconMap = { Home, Zap, Wifi, Droplets }

const iconBoxClass = {
  Home: 'bg-accent-bg text-accent',
  Zap: 'bg-warning-bg text-warning',
  Wifi: 'bg-info-bg text-info',
  Droplets: 'bg-info-bg text-info',
}

function daysBadgeClass(daysLeft) {
  if (daysLeft < 7) return 'text-danger bg-danger-bg'
  if (daysLeft < 14) return 'text-warning bg-warning-bg'
  return 'text-success bg-success-bg'
}

export default function UpcomingBillCard({ bill, onPay }) {
  const Icon = iconMap[bill.icon] || Home
  const boxClass = iconBoxClass[bill.icon] || iconBoxClass.Home

  return (
    <div className="min-w-[260px] shrink-0 rounded-[14px] border border-border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${boxClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${daysBadgeClass(bill.daysLeft)}`}>
          {bill.daysLeft}d left
        </span>
      </div>

      <p className="text-sm font-medium text-text mt-3">{bill.title}</p>
      <p className="text-lg font-medium text-text mt-1">
        ₹{bill.amount.toLocaleString('en-IN')}
      </p>
      <p className="text-xs text-text-secondary mt-0.5">Due {bill.dueDate}</p>

      <button
        type="button"
        onClick={() => onPay(bill)}
        className="w-full mt-4 py-2 text-xs font-medium rounded-[10px] border border-accent-border text-accent bg-accent-bg hover:bg-accent/10 transition-colors"
      >
        Pay from wallet
      </button>
    </div>
  )
}
