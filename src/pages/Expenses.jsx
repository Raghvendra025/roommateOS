import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, MoreHorizontal, Receipt } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import PageMotion from '../components/shared/PageMotion'
import { LoadingState, ErrorState, EmptyState } from '../components/shared/DataStates'
import useIsMobile from '../hooks/useIsMobile'
import useApiData from '../hooks/useApiData'
import { rowVariants, listContainerVariants } from '../lib/motion'
import { useDemo, DEMO_EXPENSES } from '../context/DemoContext'
import { useAuth } from '../context/AuthContext'
import { expenseAPI } from '../services/api'

const CATEGORIES = ['All', 'food', 'utilities', 'rent', 'groceries', 'entertainment', 'transport', 'maintenance', 'other']

function catLabel(c) { return c.charAt(0).toUpperCase() + c.slice(1) }

export default function Expenses() {
  const isMobile = useIsMobile()
  const { isDemo } = useDemo()
  const { houseId } = useAuth()
  const [category, setCategory] = useState('All')

  const { data, loading, error, refetch } = useApiData(
    () => expenseAPI.getExpenses(),
    [houseId],
    { skip: isDemo || !houseId }
  )

  const expenses = isDemo
    ? DEMO_EXPENSES
    : (data?.expenses || [])

  const filtered = category === 'All' ? expenses : expenses.filter((e) => (e.category || 'other') === category)
  const total    = filtered.reduce((sum, e) => sum + e.amount, 0)
  const pending  = filtered.filter((e) => !e.isSettled).length

  const handleMarkPaid = async (splitId) => {
    if (isDemo) return
    try {
      await expenseAPI.markSplitPaid(splitId)
      refetch()
    } catch (err) {
      console.error('Mark paid error:', err)
    }
  }

  const getPaidByName = (expense) => {
    if (typeof expense.paidBy === 'object') return expense.paidBy.name || '?'
    return expense.paidBy || '?'
  }

  const getInitials = (name = '') => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <PageMotion>
      <PageHeader
        title="Expenses"
        subtitle={`${filtered.length} expenses · ₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total`}
        action={<Button icon={Plus}>Add expense</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Total</p>
          <p className="text-2xl font-semibold text-text mt-1">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-semibold text-warning mt-1">{pending}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Your share (equal)</p>
          <p className="text-2xl font-semibold text-text mt-1">₹{(total / Math.max(1, 4)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-text-muted shrink-0" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all shrink-0 ${
              category === cat
                ? 'bg-accent/10 border-accent/30 text-accent'
                : 'bg-card border-border text-text-secondary hover:text-text'
            }`}
          >
            {catLabel(cat)}
          </button>
        ))}
      </div>

      <Card padding={false}>
        {loading && <LoadingState message="Loading expenses..." />}
        {!loading && error && <ErrorState message={error} onRetry={refetch} />}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState icon={Receipt} title="No expenses yet" subtitle="Add your first shared expense" />
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Expense</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted uppercase tracking-wider hidden md:table-cell">Paid by</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="px-5 py-3 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Amount</th>
                  <th className="px-5 py-3 w-10" />
                </tr>
              </thead>
              <motion.tbody variants={listContainerVariants} initial="hidden" animate="visible">
                {filtered.map((expense, index) => (
                  <motion.tr
                    key={expense._id || expense.id}
                    custom={index}
                    variants={rowVariants(isMobile)}
                    className="border-b border-border-subtle hover:bg-card-hover transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-text">{expense.title}</p>
                      <p className="text-xs text-text-muted sm:hidden">{catLabel(expense.category || 'other')}</p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <Badge variant="accent">{catLabel(expense.category || 'other')}</Badge>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar initials={getInitials(getPaidByName(expense))} size="sm" />
                        <span className="text-sm text-text-secondary">{getPaidByName(expense)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted hidden lg:table-cell">
                      {expense.date ? new Date(expense.date).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <p className="text-sm font-medium text-text">₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                      <Badge variant={expense.isSettled ? 'success' : 'warning'} className="mt-1">
                        {expense.isSettled ? 'Settled' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <button type="button" className="p-1 rounded text-text-muted hover:text-text hover:bg-card transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        )}
      </Card>
    </PageMotion>
  )
}
