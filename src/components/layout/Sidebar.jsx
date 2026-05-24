import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Wallet, Receipt, ShoppingCart,
  CheckSquare, Home, Bell, Plus, LogOut, Sparkles,
} from 'lucide-react'
import { accentGlow } from '../../lib/classes'
import { useAuth } from '../../context/AuthContext'
import { useDemo, DEMO_HOUSE } from '../../context/DemoContext'

const navItems = [
  { to: '/dashboard',     icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/wallet',        icon: Wallet,          label: 'House Wallet' },
  { to: '/expenses',      icon: Receipt,         label: 'Expenses'     },
  { to: '/groceries',     icon: ShoppingCart,    label: 'Groceries'    },
  { to: '/chores',        icon: CheckSquare,     label: 'Chores'       },
  { to: '/rent',          icon: Home,            label: 'Rent'         },
  { to: '/notifications', icon: Bell,            label: 'Notifications', badge: 3 },
  { to: '/house',         icon: Plus,            label: 'House'        },
]

export default function Sidebar({ className = 'hidden lg:flex' }) {
  const { isDemo, exitDemo } = useDemo()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const houseName = isDemo ? DEMO_HOUSE.name : 'My House'
  const houseCode = isDemo ? DEMO_HOUSE.inviteCode : '—'

  const handleSignOut = () => {
    if (isDemo) {
      exitDemo()
    } else {
      logout()
    }
    navigate('/login')
  }

  return (
    <aside className={`flex-col w-60 border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl shrink-0 ${className}`}>
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center ${accentGlow}`}>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="text-sm font-semibold text-text">RoommateOS</span>
            <p className="text-[10px] text-text-muted uppercase tracking-widest">
              {isDemo ? '✨ Demo' : 'Premium'}
            </p>
          </div>
        </div>
      </div>

      {/* House badge */}
      <div className="px-3 py-4 border-b border-border">
        <div className="px-3 py-2.5 rounded-lg bg-card border border-border">
          <p className="text-[10px] text-text-muted uppercase tracking-wider">Current house</p>
          <p className="text-sm font-medium text-text mt-0.5 truncate">{houseName}</p>
          <p className="text-xs text-accent font-mono mt-0.5">{houseCode}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 border border-transparent ${
                isActive
                  ? 'text-accent font-medium'
                  : 'text-text-secondary hover:text-text hover:bg-card'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent/10 rounded-lg border border-accent/20"
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                )}
                <Icon className="w-4 h-4 shrink-0 relative z-10" />
                <span className="flex-1 relative z-10">{label}</span>
                {badge && (
                  <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-semibold bg-accent text-on-accent rounded-full min-w-[18px] text-center">
                    {badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-border">
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-danger hover:bg-danger/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          {isDemo ? 'Exit demo' : 'Sign out'}
        </button>
      </div>
    </aside>
  )
}
