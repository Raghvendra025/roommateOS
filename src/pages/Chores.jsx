import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, CheckCircle2, AlertCircle, CheckSquare } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import PageMotion from '../components/shared/PageMotion'
import { LoadingState, ErrorState, EmptyState } from '../components/shared/DataStates'
import useIsMobile from '../hooks/useIsMobile'
import useApiData from '../hooks/useApiData'
import { feedRowVariants, listContainerVariants } from '../lib/motion'
import { useDemo, DEMO_CHORES } from '../context/DemoContext'
import { useAuth } from '../context/AuthContext'
import { choreAPI } from '../services/api'

const statusConfig = {
  pending:   { variant: 'warning', icon: Clock,        label: 'Pending'  },
  overdue:   { variant: 'danger',  icon: AlertCircle,  label: 'Overdue'  },
  done:      { variant: 'success', icon: CheckCircle2, label: 'Done'     },
  completed: { variant: 'success', icon: CheckCircle2, label: 'Done'     },
}

export default function Chores() {
  const isMobile   = useIsMobile()
  const { isDemo } = useDemo()
  const { houseId } = useAuth()
  const [localChores, setLocalChores] = useState(null)

  const { data, loading, error, refetch } = useApiData(
    () => choreAPI.getChores(),
    [houseId],
    { skip: isDemo || !houseId }
  )

  const apiChores = data?.chores || []
  const choreList = localChores ?? (isDemo ? DEMO_CHORES : apiChores)

  const pending   = choreList.filter((c) => c.status !== 'done' && c.status !== 'completed')
  const completed = choreList.filter((c) => c.status === 'done' || c.status === 'completed')
  const totalPoints = choreList.reduce((sum, c) => sum + ((c.status === 'done' || c.status === 'completed') ? (c.points || 0) : 0), 0)

  const markDone = useCallback(async (chore) => {
    const id = chore._id || chore.id

    // Optimistic update
    setLocalChores((prev) => {
      const list = prev ?? (isDemo ? DEMO_CHORES : apiChores)
      return list.map((c) => (c._id || c.id) === id ? { ...c, status: 'done' } : c)
    })

    if (!isDemo) {
      try {
        await choreAPI.markDone(id)
      } catch {
        // Revert on error
        setLocalChores((prev) => {
          const list = prev ?? apiChores
          return list.map((c) => (c._id || c.id) === id ? { ...c, status: chore.status } : c)
        })
      }
    }
  }, [isDemo, apiChores])

  const getAssigneeName    = (c) => typeof c.assignedTo === 'object' ? c.assignedTo?.name : c.assignee || '?'
  const getAssigneeInitials = (c) => {
    const name = getAssigneeName(c)
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  }
  const formatDate = (d) => {
    if (!d) return '—'
    try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) }
    catch { return d }
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

      {loading && <LoadingState message="Loading chores..." />}
      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="To do" subtitle="Upcoming and overdue" />
            {pending.length === 0 ? (
              <EmptyState icon={CheckSquare} title="All chores done!" subtitle="Great work, team 🎉" />
            ) : (
              <motion.div className="space-y-3" variants={listContainerVariants} initial="hidden" animate="visible">
                {pending.map((chore, index) => {
                  const config = statusConfig[chore.status] || statusConfig.pending
                  const StatusIcon = config.icon
                  return (
                    <motion.div
                      key={chore._id || chore.id}
                      custom={index}
                      variants={feedRowVariants(isMobile)}
                      className="p-4 rounded-lg border border-border hover:bg-card-hover transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <motion.button
                            type="button"
                            onClick={() => markDone(chore)}
                            whileTap={{ scale: 0.97 }}
                            className="w-5 h-5 rounded border border-border flex items-center justify-center hover:border-success hover:bg-success/10 shrink-0 mt-0.5"
                          />
                          <div className={`p-2 rounded-lg ${chore.status === 'overdue' ? 'bg-danger/10 border border-danger/20' : 'bg-warning/10 border border-warning/20'}`}>
                            <StatusIcon className={`w-4 h-4 ${chore.status === 'overdue' ? 'text-danger' : 'text-warning'}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text">{chore.title}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Avatar initials={getAssigneeInitials(chore)} size="sm" />
                              <span className="text-xs text-text-muted">{getAssigneeName(chore)}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-subtle text-xs text-text-muted ml-8">
                        <span>Due {formatDate(chore.dueDate)}</span>
                        {chore.frequency && <><span>·</span><span>{chore.frequency}</span></>}
                        {chore.points > 0 && <><span>·</span><span className="text-accent font-medium">{chore.points} pts</span></>}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </Card>

          <Card>
            <CardHeader title="Completed" subtitle="Recently finished" />
            {completed.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-8">No completed chores yet</p>
            ) : (
              <motion.div className="space-y-3" variants={listContainerVariants} initial="hidden" animate="visible">
                {completed.map((chore, index) => (
                  <motion.div
                    key={chore._id || chore.id}
                    custom={index}
                    variants={feedRowVariants(isMobile)}
                    className="flex items-center gap-3 p-4 rounded-lg bg-card-hover/30 opacity-75"
                  >
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.2, ease: 'easeOut' }}>
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-secondary line-through">{chore.title}</p>
                      <p className="text-xs text-text-muted">{getAssigneeName(chore)} · {formatDate(chore.dueDate)}</p>
                    </div>
                    {chore.points > 0 && <span className="text-xs text-accent font-medium">+{chore.points}</span>}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Card>
        </div>
      )}
    </PageMotion>
  )
}
