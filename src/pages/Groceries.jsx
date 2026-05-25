import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, ShoppingCart } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import PageMotion from '../components/shared/PageMotion'
import { LoadingState, ErrorState, EmptyState } from '../components/shared/DataStates'
import useIsMobile from '../hooks/useIsMobile'
import useApiData from '../hooks/useApiData'
import { feedRowVariants, listContainerVariants } from '../lib/motion'
import { useDemo, DEMO_GROCERIES } from '../context/DemoContext'
import { useAuth } from '../context/AuthContext'
import { groceryAPI } from '../services/api'

const priorityVariant = { high: 'danger', urgent: 'danger', medium: 'warning', low: 'default' }

export default function Groceries() {
  const isMobile = useIsMobile()
  const { isDemo } = useDemo()
  const { houseId } = useAuth()
  const [localItems, setLocalItems] = useState(null) // null = use API data

  const { data, loading, error, refetch } = useApiData(
    () => groceryAPI.getItems(),
    [houseId],
    { skip: isDemo || !houseId }
  )

  // In demo mode, manage local state. In real mode, use API data with optimistic UI.
  const apiItems = data?.groceries || data?.items || []
  const items = isDemo
    ? (localItems ?? DEMO_GROCERIES)
    : (localItems ?? apiItems)

  // Sync localItems when API data arrives (first load)
  if (!isDemo && data && localItems === null) {
    // will be set on next render via setLocalItems — use apiItems directly
  }

  const resolvedItems = localItems !== null
    ? localItems
    : (isDemo ? DEMO_GROCERIES : apiItems)

  const checked   = resolvedItems.filter((i) => i.isBought || i.checked)
  const unchecked = resolvedItems.filter((i) => !(i.isBought || i.checked))

  const toggle = useCallback(async (item) => {
    const id      = item._id || item.id
    const bought  = !(item.isBought || item.checked)

    // Optimistic UI
    setLocalItems((prev) => {
      const list = prev ?? resolvedItems
      return list.map((i) =>
        (i._id || i.id) === id
          ? { ...i, isBought: bought, checked: bought }
          : i
      )
    })

    if (!isDemo) {
      try {
        await groceryAPI.markBought(id, { isBought: bought })
      } catch (err) {
        // Revert on error
        setLocalItems((prev) => {
          const list = prev ?? resolvedItems
          return list.map((i) =>
            (i._id || i.id) === id
              ? { ...i, isBought: !bought, checked: !bought }
              : i
          )
        })
      }
    }
  }, [isDemo, resolvedItems])

  const getItemName    = (item) => item.name  || item.item  || '?'
  const getAddedBy     = (item) => typeof item.addedBy === 'object' ? item.addedBy.name : item.addedBy
  const getQty         = (item) => item.quantity ? `${item.quantity}${item.unit ? ' ' + item.unit : ''}` : ''
  const getPriority    = (item) => item.priority || 'low'

  return (
    <PageMotion>
      <PageHeader
        title="Groceries"
        subtitle={`${unchecked.length} items to buy`}
        action={<Button icon={Plus}>Add item</Button>}
      />

      {loading && <LoadingState message="Loading groceries..." />}
      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-secondary">Shopping progress</span>
              <span className="text-sm font-medium text-text">{checked.length}/{resolvedItems.length}</span>
            </div>
            <ProgressBar value={checked.length} max={Math.max(resolvedItems.length, 1)} animated />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="To buy" subtitle={`${unchecked.length} remaining`} />
              {unchecked.length === 0 ? (
                <EmptyState icon={ShoppingCart} title="All bought!" subtitle="Nothing left to get" />
              ) : (
                <motion.div className="space-y-2" variants={listContainerVariants} initial="hidden" animate="visible">
                  {unchecked.map((item, index) => (
                    <motion.div
                      key={item._id || item.id}
                      custom={index}
                      variants={feedRowVariants(isMobile)}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-card-hover transition-colors group"
                    >
                      <motion.button
                        type="button"
                        onClick={() => toggle(item)}
                        whileTap={{ scale: 0.97 }}
                        className="w-5 h-5 rounded border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text">{getItemName(item)}</p>
                        <p className="text-xs text-text-muted">{getQty(item)} · {getAddedBy(item)}</p>
                      </div>
                      <Badge variant={priorityVariant[getPriority(item)] || 'default'}>{getPriority(item)}</Badge>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </Card>

            <Card>
              <CardHeader title="In cart" subtitle={`${checked.length} checked off`} />
              <div className="space-y-2">
                {checked.map((item) => (
                  <motion.div
                    key={item._id || item.id}
                    animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card-hover/50"
                  >
                    <motion.button
                      type="button"
                      onClick={() => toggle(item)}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="w-5 h-5 rounded bg-accent border border-accent flex items-center justify-center shrink-0"
                    >
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
                        <Check className="w-3 h-3 text-bg" />
                      </motion.div>
                    </motion.button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-secondary line-through">{getItemName(item)}</p>
                      <p className="text-xs text-text-muted">{getQty(item)}</p>
                    </div>
                  </motion.div>
                ))}
                {checked.length === 0 && (
                  <p className="text-sm text-text-muted text-center py-8">No items checked yet</p>
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </PageMotion>
  )
}
