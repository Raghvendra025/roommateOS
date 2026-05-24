import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wallet, CheckSquare, ShoppingCart,
  Calendar, ArrowRight, Receipt, Home,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatCard from '../components/ui/StatCard'
import Card, { CardHeader } from '../components/ui/Card'
import Avatar from '../components/ui/Avatar'
import ProgressBar from '../components/ui/ProgressBar'
import PageMotion from '../components/shared/PageMotion'
import AnimatedNumber from '../components/shared/AnimatedNumber'
import useIsMobile from '../hooks/useIsMobile'
import { cardHover } from '../lib/classes'
import { containerVariants, cardVariants, feedRowVariants, listContainerVariants } from '../lib/motion'
import { useDemo, DEMO_USER, DEMO_HOUSE, DEMO_MEMBERS, DEMO_STATS, DEMO_ACTIVITY } from '../context/DemoContext'
import { useAuth } from '../context/AuthContext'

const activityIcons = {
  expense: Receipt,
  chore: CheckSquare,
  grocery: ShoppingCart,
  rent: Home,
}

export default function Dashboard() {
  const isMobile = useIsMobile()
  const { isDemo } = useDemo()
  const { user: authUser } = useAuth()

  // Use demo data or real data
  const user = isDemo ? DEMO_USER : authUser
  const house = isDemo ? DEMO_HOUSE : null
  const members = isDemo ? DEMO_MEMBERS : []
  const stats = isDemo ? DEMO_STATS : { totalOwed: 0, yourBalance: 0, pendingChores: 0, groceriesNeeded: 0, rentDueIn: 0, monthlySpend: 0, monthlyBudget: 40000 }
  const recentActivity = isDemo ? DEMO_ACTIVITY : []

  const firstName = user?.name?.split(' ')[0] || 'there'
  const unsettled = members.filter((m) => m.balance !== 0)
  const rentPerPerson = house ? Math.round(house.monthlyRent / Math.max(members.length, 1)) : 0

  return (
    <PageMotion>
      <PageHeader
        title={`Hey, ${firstName} 👋`}
        subtitle={house ? `${house.name} · ${members.length} roommates` : 'Set up your house to get started'}
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatCard
          label="Your balance"
          change={stats.yourBalance < 0 ? 'You owe' : 'You are owed'}
          trend={stats.yourBalance < 0 ? 'down' : 'up'}
          icon={Wallet}
          numericValue={Math.abs(stats.yourBalance)}
          numericDecimals={0}
          variants={cardVariants(isMobile)}
        />
        <StatCard
          label="Pending chores"
          value={stats.pendingChores}
          change="1 overdue"
          trend="down"
          icon={CheckSquare}
          variants={cardVariants(isMobile)}
        />
        <StatCard
          label="Groceries needed"
          value={stats.groceriesNeeded}
          change="2 high priority"
          trend="up"
          icon={ShoppingCart}
          variants={cardVariants(isMobile)}
        />
        <StatCard
          label="Rent due in"
          value={`${stats.rentDueIn} days`}
          change={`₹${rentPerPerson.toLocaleString('en-IN')} your share`}
          trend="up"
          icon={Calendar}
          variants={cardVariants(isMobile)}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Recent activity" subtitle="Latest updates in your house" />
          <motion.div
            className="space-y-1"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {recentActivity.length > 0 ? recentActivity.map((item, index) => {
              const Icon = activityIcons[item.type] || Receipt
              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={feedRowVariants(isMobile)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-card-hover transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{item.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.user} · {item.time}</p>
                  </div>
                  {item.amount && (
                    <span className="text-sm font-medium text-text">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                  )}
                </motion.div>
              )
            }) : (
              <p className="text-sm text-text-muted py-4 text-center">No activity yet</p>
            )}
          </motion.div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Balances" subtitle="Who owes whom" />
            <div className="space-y-3">
              {unsettled.length > 0 ? unsettled.map((member) => (
                <div key={member._id} className="flex items-center gap-3">
                  <Avatar initials={member.user.avatar || member.user.name.slice(0, 2)} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text truncate">{member.user.name}</p>
                  </div>
                  <span className={`text-sm font-medium ${member.balance < 0 ? 'text-danger' : member.balance > 0 ? 'text-success' : 'text-text-muted'}`}>
                    {member.balance === 0 ? 'Settled' : member.balance < 0
                      ? `−₹${Math.abs(member.balance).toLocaleString('en-IN')}`
                      : `+₹${member.balance.toLocaleString('en-IN')}`}
                  </span>
                </div>
              )) : (
                <p className="text-sm text-text-muted">All settled up 🎉</p>
              )}
            </div>
          </Card>

          <Card className="pb-7">
            <CardHeader title="Monthly spend" subtitle="May 2026" />
            <p className="text-3xl font-semibold text-text tracking-tight">
              <AnimatedNumber value={stats.monthlySpend} duration={1200} />
            </p>
            <div className="mt-5 space-y-3">
              <ProgressBar value={stats.monthlySpend} max={stats.monthlyBudget} animated />
              <p className="text-xs text-text-secondary">
                {Math.round((stats.monthlySpend / stats.monthlyBudget) * 100)}% of ₹{stats.monthlyBudget.toLocaleString('en-IN')} budget
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        {[
          { to: '/expenses', label: 'Expenses', icon: Receipt },
          { to: '/groceries', label: 'Groceries', icon: ShoppingCart },
          { to: '/chores', label: 'Chores', icon: CheckSquare },
          { to: '/rent', label: 'Rent', icon: Home },
        ].map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className={`${cardHover} p-4 flex items-center justify-between group`}>
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-text">{label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </PageMotion>
  )
}
