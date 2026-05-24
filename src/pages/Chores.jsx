import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import PageMotion from '../components/shared/PageMotion'
import useIsMobile from '../hooks/useIsMobile'
import { chores as initialChores } from '../data/mockData'
import { feedRowVariants, listContainerVariants } from '../lib/motion'

const statusConfig = {
  pending: { variant: 'warning', icon: Clock, label: 'Pending' },
  overdue: { variant: 'danger', icon: AlertCircle, label: 'Overdue' },
  completed: { variant: 'success', icon: CheckCircle2, label: 'Done' },
}

export default function Chores() {
  const isMobile = useIsMobile()
  const [choreList, setChoreList] = useState(initialChores)
  const pending = choreList.filter((c) => c.status !== 'completed')
  const completed = choreList.filter((c) => c.status === 'completed')
  const totalPoints = choreList.reduce((sum, c) => sum + (c.status === 'completed' ? c.points : 0), 0)

  const markDone = (id) => {
    setChoreList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'completed' } : c))
    )
  }

  return (
    <PageMotion>
      <PageHeader
        title="Chores"
        subtitle={`${pending.length} active · ${totalPoints} pts earned`}
        action={<Button icon={Plus}>Add chore</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Active</p>
          <p className="text-2xl font-semibold text-text mt-1">{pending.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Overdue</p>
          <p className="text-2xl font-semibold text-danger mt-1">
            {choreList.filter((c) => c.status === 'overdue').length}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Points earned</p>
          <p className="text-2xl font-semibold text-accent mt-1">{totalPoints}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="To do" subtitle="Upcoming and overdue" />
          <motion.div className="space-y-3" variants={listContainerVariants} initial="hidden" animate="visible">
            {pending.map((chore, index) => {
              const config = statusConfig[chore.status]
              const StatusIcon = config.icon
              return (
                <motion.div
                  key={chore.id}
                  custom={index}
                  variants={feedRowVariants(isMobile)}
                  className="p-4 rounded-lg border border-border hover:bg-card-hover transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <motion.button
                        type="button"
                        onClick={() => markDone(chore.id)}
                        whileTap={{ scale: 0.97 }}
                        className="w-5 h-5 rounded border border-border flex items-center justify-center hover:border-success hover:bg-success/10 shrink-0 mt-0.5"
                      />
                      <div className={`p-2 rounded-lg ${chore.status === 'overdue' ? 'bg-danger/10 border border-danger/20' : 'bg-warning/10 border border-warning/20'}`}>
                        <StatusIcon className={`w-4 h-4 ${chore.status === 'overdue' ? 'text-danger' : 'text-warning'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{chore.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Avatar initials={chore.assignee.split(' ').map((n) => n[0]).join('')} size="sm" />
                          <span className="text-xs text-text-muted">{chore.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-subtle text-xs text-text-muted ml-8">
                    <span>Due {chore.dueDate}</span>
                    <span>·</span>
                    <span>{chore.frequency}</span>
                    <span>·</span>
                    <span className="text-accent font-medium">{chore.points} pts</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </Card>

        <Card>
          <CardHeader title="Completed" subtitle="Recently finished" />
          <motion.div className="space-y-3" variants={listContainerVariants} initial="hidden" animate="visible">
            {completed.map((chore, index) => (
              <motion.div
                key={chore.id}
                custom={index}
                variants={feedRowVariants(isMobile)}
                className="flex items-center gap-3 p-4 rounded-lg bg-card-hover/30 opacity-75"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-secondary line-through">{chore.title}</p>
                  <p className="text-xs text-text-muted">{chore.assignee} · {chore.dueDate}</p>
                </div>
                <span className="text-xs text-accent font-medium">+{chore.points}</span>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </div>
    </PageMotion>
  )
}
