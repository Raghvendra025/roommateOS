import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Receipt, CheckSquare, Home, ShoppingCart, Users, Settings } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import PageMotion from '../components/shared/PageMotion'
import useIsMobile from '../hooks/useIsMobile'
import { notifications as initialNotifications } from '../data/mockData'
import { rowVariants, listContainerVariants } from '../lib/motion'

const typeConfig = {
  expense: { icon: Receipt, color: 'text-accent' },
  chore: { icon: CheckSquare, color: 'text-warning' },
  rent: { icon: Home, color: 'text-success' },
  grocery: { icon: ShoppingCart, color: 'text-accent' },
  member: { icon: Users, color: 'text-success' },
  system: { icon: Settings, color: 'text-text-muted' },
}

export default function Notifications() {
  const isMobile = useIsMobile()
  const [items, setItems] = useState(initialNotifications)
  const unread = items.filter((n) => !n.read).length

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const toggleRead = (id) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    )
  }

  return (
    <PageMotion>
      <PageHeader
        title="Notifications"
        subtitle={`${unread} unread`}
        action={
          <Button variant="secondary" onClick={markAllRead} disabled={unread === 0}>
            Mark all read
          </Button>
        }
      />

      {unread > 0 && (
        <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-accent/5 border border-accent/20">
          <Bell className="w-5 h-5 text-accent" />
          <p className="text-sm text-text-secondary">
            You have <span className="text-accent font-medium">{unread} unread</span> notifications
          </p>
        </div>
      )}

      <Card padding={false}>
        <motion.div className="divide-y divide-border-subtle" variants={listContainerVariants} initial="hidden" animate="visible">
          {items.map((notification, index) => {
            const config = typeConfig[notification.type] || typeConfig.system
            const Icon = config.icon
            return (
              <motion.button
                key={notification.id}
                type="button"
                custom={index}
                variants={rowVariants(isMobile)}
                onClick={() => toggleRead(notification.id)}
                className={`w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-card-hover transition-colors ${
                  !notification.read ? 'bg-accent/[0.02]' : ''
                }`}
              >
                <div className={`p-2.5 rounded-lg bg-card border border-border shrink-0 ${!notification.read ? 'border-accent/30' : ''}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${notification.read ? 'text-text-secondary' : 'text-text'}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-text-muted mt-0.5 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-text-muted mt-1.5">{notification.time}</p>
                </div>
                <Badge variant={notification.read ? 'default' : 'accent'}>
                  {notification.read ? 'Read' : 'New'}
                </Badge>
              </motion.button>
            )
          })}
        </motion.div>
      </Card>
    </PageMotion>
  )
}
