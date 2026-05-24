import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Home, Receipt, Plus } from 'lucide-react'
import { walletData as initialData } from '../data/walletData'
import TransactionRow from '../components/wallet/TransactionRow'
import MemberContribution from '../components/wallet/MemberContribution'
import UpcomingBillCard from '../components/wallet/UpcomingBillCard'
import AddMoneyModal from '../components/wallet/AddMoneyModal'
import PayBillModal from '../components/wallet/PayBillModal'
import PageMotion from '../components/shared/PageMotion'
import AnimatedNumber from '../components/shared/AnimatedNumber'
import useIsMobile from '../hooks/useIsMobile'

const SYSTEM_MEMBER = {
  member: 'System',
  memberInitials: 'SY',
  memberColor: 'var(--theme-danger-bg)',
  memberTextColor: 'var(--theme-danger)',
}

function formatNow() {
  const now = new Date()
  return `Today, ${now.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}`
}

export default function HouseWallet() {
  const isMobile = useIsMobile()
  const [balance, setBalance] = useState(initialData.balance)
  const [transactions, setTransactions] = useState(initialData.transactions)
  const [members, setMembers] = useState(initialData.members)
  const [filter, setFilter] = useState('all')
  const [showAllTx, setShowAllTx] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [preselectedBill, setPreselectedBill] = useState(null)

  const { monthlyTarget, upcomingBills } = initialData
  const progressPct = Math.min(100, (balance / monthlyTarget) * 100)
  const totalContributed = members.reduce((sum, m) => sum + m.contributed, 0)

  const currentMember = members[0]

  const filteredTransactions = useMemo(() => {
    let list = [...transactions]
    if (filter === 'credit') list = list.filter((t) => t.type === 'credit')
    if (filter === 'debit') list = list.filter((t) => t.type === 'debit')
    if (!showAllTx) list = list.slice(0, 6)
    return list
  }, [transactions, filter, showAllTx])

  const handleAddMoney = ({ amount, paymentMethod, note, member }) => {
    const newTx = {
      id: Date.now(),
      type: 'credit',
      title: 'Wallet Top-up',
      description: note || `${member.name} added money via ${paymentMethod}`,
      amount,
      member: member.name,
      memberInitials: member.initials,
      memberColor: member.color,
      memberTextColor: member.textColor,
      date: formatNow(),
      paymentMethod,
      status: 'completed',
    }
    setTransactions((prev) => [newTx, ...prev])
    setBalance((b) => b + amount)
    setMembers((prev) =>
      prev.map((m) =>
        m.id === member.id ? { ...m, contributed: m.contributed + amount } : m
      )
    )
  }

  const handlePayBill = ({ amount, title, description }) => {
    const newTx = {
      id: Date.now(),
      type: 'debit',
      title,
      description,
      amount,
      ...SYSTEM_MEMBER,
      date: formatNow(),
      paymentMethod: 'Wallet',
      status: 'completed',
    }
    setTransactions((prev) => [newTx, ...prev])
    setBalance((b) => b - amount)
    setPreselectedBill(null)
  }

  const openPayModal = (bill = null) => {
    setPreselectedBill(bill)
    setPayModalOpen(true)
  }

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'credit', label: 'Credits' },
    { id: 'debit', label: 'Debits' },
  ]

  return (
    <PageMotion>
      <div className="rounded-[14px] border border-wallet-hero-border bg-wallet-hero p-6 mb-8 shadow-card">
        <p className="text-[11px] uppercase tracking-wider text-text-subtle font-medium">
          Wallet balance
        </p>
        <p className="text-[36px] font-medium text-accent mt-1 tracking-tight">
          <AnimatedNumber value={balance} duration={1200} />
        </p>

        <div className="mt-5 h-1.5 rounded-[3px] bg-elevated overflow-hidden">
          <motion.div
            className="h-full rounded-[3px] bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <p className="text-[11px] text-text-subtle mt-2">
          ₹{balance.toLocaleString('en-IN')} of ₹{monthlyTarget.toLocaleString('en-IN')} monthly target
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <motion.button
            type="button"
            onClick={() => setAddModalOpen(true)}
            whileHover={isMobile ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[10px] bg-accent text-on-accent hover:bg-accent/90"
          >
            <Plus className="w-4 h-4" />
            Add money
          </motion.button>
          <motion.button
            type="button"
            onClick={() => openPayModal(upcomingBills[0])}
            whileHover={isMobile ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[10px] border border-border text-text-secondary bg-transparent hover:text-text hover:border-border"
          >
            <Home className="w-4 h-4" />
            Pay rent from wallet
          </motion.button>
          <motion.button
            type="button"
            onClick={() => openPayModal()}
            whileHover={isMobile ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[10px] border border-border text-text-secondary bg-transparent hover:text-text hover:border-border"
          >
            <Receipt className="w-4 h-4" />
            Pay bill from wallet
          </motion.button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-medium text-text mb-4">Upcoming Bills</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {upcomingBills.map((bill) => (
            <UpcomingBillCard key={bill.id} bill={bill} onPay={openPayModal} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[14px] border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text">Recent Transactions</h2>
            <button
              type="button"
              onClick={() => setShowAllTx((v) => !v)}
              className="text-xs text-accent hover:text-accent/80"
            >
              {showAllTx ? 'Show less' : 'View all'}
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-[10px] border transition-colors ${
                  filter === tab.id
                    ? 'border-accent text-accent bg-accent-bg'
                    : 'border-border text-text-secondary hover:text-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div>
            {filteredTransactions.length === 0 ? (
              <p className="text-sm text-text-secondary py-8 text-center">No transactions found</p>
            ) : (
              filteredTransactions.map((tx, index) => (
                <TransactionRow key={tx.id} transaction={tx} index={index} />
              ))
            )}
          </div>
        </div>

        <div className="rounded-[14px] border border-border bg-card p-5 shadow-card">
          <h2 className="text-sm font-medium text-text mb-4">Member Contributions</h2>
          {members.map((member) => (
            <MemberContribution
              key={member.id}
              member={member}
              totalContributed={totalContributed}
            />
          ))}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Total contributed</span>
              <span className="text-text font-medium">
                <AnimatedNumber value={totalContributed} duration={1000} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <AddMoneyModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onConfirm={handleAddMoney}
        currentMember={currentMember}
      />

      <PayBillModal
        open={payModalOpen}
        onClose={() => {
          setPayModalOpen(false)
          setPreselectedBill(null)
        }}
        onConfirm={handlePayBill}
        balance={balance}
        preselectedBill={preselectedBill}
      />
    </PageMotion>
  )
}
