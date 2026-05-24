import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Bell, Menu } from 'lucide-react'
import Avatar from '../ui/Avatar'
import ThemeToggle from '../shared/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import { useDemo, DEMO_USER, DEMO_NOTIFICATIONS } from '../../context/DemoContext'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/wallet': 'House Wallet',
  '/expenses': 'Expenses',
  '/groceries': 'Groceries',
  '/chores': 'Chores',
  '/rent': 'Rent',
  '/notifications': 'Notifications',
  '/house': 'House',
}

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation()
  const { user: authUser } = useAuth()
  const { isDemo } = useDemo()

  const user = isDemo ? DEMO_USER : authUser
  const notifications = isDemo ? DEMO_NOTIFICATIONS : []
  const unreadCount = notifications.filter((n) => !n.isRead).length
  const title = pageTitles[pathname] || 'RoommateOS'

  // derive initials from name if no avatar string
  const avatarInitials = user?.avatar || user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '?'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 lg:px-8 py-4 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-text tracking-tight">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border w-56">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none w-full"
          />
          <kbd className="hidden sm:inline text-[10px] text-text-muted bg-border px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>

        <button type="button" className="relative p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-colors">
          <motion.div
            animate={unreadCount > 0 ? { rotate: [0, -10, 10, -10, 10, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Bell className="w-5 h-5" />
          </motion.div>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          )}
        </button>

        <ThemeToggle />

        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <Avatar initials={avatarInitials} size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text leading-none">{user?.name || 'Guest'}</p>
            <p className="text-xs text-text-muted mt-0.5">{isDemo ? '✨ Demo mode' : user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
