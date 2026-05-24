import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, MoreHorizontal } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import PageMotion from '../components/shared/PageMotion'
import useIsMobile from '../hooks/useIsMobile'
import { expenses, expenseCategories } from '../data/mockData'
import { rowVariants, listContainerVariants } from '../lib/motion'

export default function Expenses() {
  const isMobile = useIsMobile()
  const [category, setCategory] = useState('All')
  const filtered = category === 'All' ? expenses : expenses.filter((e) => e.category === category)
  const total = filtered.reduce((sum, e) => sum + e.amount, 0)
  const pending = filtered.filter((e) => e.status === 'pending').length

  return (
    <PageMotion>
      <PageHeader
        title="Expenses"
        subtitle={`${filtered.length} expenses · ₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total`}
        action={
          <Button icon={Plus}>Add expense</Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Total</p>
          <p className="text-2xl font-semibold text-text mt-1">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-semibold text-warning mt-1">{pending}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted uppercase tracking-wider">Your share</p>
          <p className="text-2xl font-semibold text-text mt-1">₹{(total / 4).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-text-muted shrink-0" />
        {expenseCategories.map((cat) => (
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
            {cat}
          </button>
        ))}
      </div>

      <Card padding={false}>
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
                  key={expense.id}
                  custom={index}
                  variants={rowVariants(isMobile)}
                  className="border-b border-border-subtle hover:bg-card-hover transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-text">{expense.title}</p>
                    <p className="text-xs text-text-muted sm:hidden">{expense.category}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <Badge variant="accent">{expense.category}</Badge>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar initials={expense.paidBy.split(' ').map((n) => n[0]).join('')} size="sm" />
                      <span className="text-sm text-text-secondary">{expense.paidBy}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-text-muted hidden lg:table-cell">{expense.date}</td>
                  <td className="px-5 py-4 text-right">
                    <p className="text-sm font-medium text-text">₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <Badge variant={expense.status === 'settled' ? 'success' : 'warning'} className="mt-1">
                      {expense.status}
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
      </Card>
    </PageMotion>
  )
}
