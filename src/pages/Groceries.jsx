import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import PageMotion from '../components/shared/PageMotion'
import useIsMobile from '../hooks/useIsMobile'
import { groceries as initialGroceries } from '../data/mockData'
import { feedRowVariants, listContainerVariants } from '../lib/motion'

const priorityVariant = { high: 'danger', medium: 'warning', low: 'default' }

export default function Groceries() {
  const isMobile = useIsMobile()
  const [items, setItems] = useState(initialGroceries)
  const checked = items.filter((i) => i.checked).length
  const unchecked = items.filter((i) => !i.checked)

  const toggle = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  return (
    <PageMotion>
      <PageHeader
        title="Groceries"
        subtitle={`${unchecked.length} items to buy`}
        action={<Button icon={Plus}>Add item</Button>}
      />

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary">Shopping progress</span>
          <span className="text-sm font-medium text-text">{checked}/{items.length}</span>
        </div>
        <ProgressBar value={checked} max={items.length} animated />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="To buy" subtitle={`${unchecked.length} remaining`} />
          <motion.div className="space-y-2" variants={listContainerVariants} initial="hidden" animate="visible">
            {unchecked.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={feedRowVariants(isMobile)}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-card-hover transition-colors group"
              >
                <motion.button
                  type="button"
                  onClick={() => toggle(item.id)}
                  whileTap={{ scale: 0.97 }}
                  className="w-5 h-5 rounded border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text">{item.item}</p>
                  <p className="text-xs text-text-muted">{item.quantity} · {item.addedBy}</p>
                </div>
                <Badge variant={priorityVariant[item.priority]}>{item.priority}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </Card>

        <Card>
          <CardHeader title="In cart" subtitle={`${checked} checked off`} />
          <div className="space-y-2">
            {items.filter((i) => i.checked).map((item) => (
              <motion.div
                key={item.id}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center gap-3 p-3 rounded-lg bg-card-hover/50"
              >
                <motion.button
                  type="button"
                  onClick={() => toggle(item.id)}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="w-5 h-5 rounded bg-accent border border-accent flex items-center justify-center shrink-0"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    <Check className="w-3 h-3 text-bg" />
                  </motion.div>
                </motion.button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-secondary line-through">{item.item}</p>
                  <p className="text-xs text-text-muted">{item.quantity}</p>
                </div>
              </motion.div>
            ))}
            {checked === 0 && (
              <p className="text-sm text-text-muted text-center py-8">No items checked yet</p>
            )}
          </div>
        </Card>
      </div>
    </PageMotion>
  )
}
