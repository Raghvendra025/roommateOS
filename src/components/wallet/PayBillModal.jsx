import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { billOptions } from '../../data/walletData'
import Modal from '../shared/Modal'
import useIsMobile from '../../hooks/useIsMobile'

export default function PayBillModal({ open, onClose, onConfirm, balance, preselectedBill }) {
  const [billType, setBillType] = useState('rent')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!open) return
    if (preselectedBill) {
      const match = billOptions.find((b) =>
        preselectedBill.title.toLowerCase().includes(b.label.toLowerCase())
      )
      const type = match?.value || 'other'
      setBillType(type)
      setAmount(String(preselectedBill.amount))
      setDescription(preselectedBill.title)
    } else {
      setBillType('rent')
      const rent = billOptions.find((b) => b.value === 'rent')
      setAmount(String(rent?.defaultAmount || ''))
      setDescription('Monthly Rent')
    }
  }, [open, preselectedBill])

  const handleBillChange = (value) => {
    setBillType(value)
    const option = billOptions.find((b) => b.value === value)
    if (option) {
      setAmount(option.defaultAmount ? String(option.defaultAmount) : '')
      setDescription(option.label === 'Other' ? '' : `${option.label} Bill`)
    }
  }

  const parsedAmount = parseFloat(amount) || 0
  const insufficient = parsedAmount > balance
  const isValid = parsedAmount > 0 && !insufficient

  const handlePay = () => {
    if (!isValid) return
    const option = billOptions.find((b) => b.value === billType)
    onConfirm({
      amount: parsedAmount,
      title: description || option?.label || 'Bill Payment',
      description: description || `${option?.label} paid from wallet`,
      billType,
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-text">Pay from Wallet</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-text-secondary hover:text-text hover:bg-elevated"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <label className="block text-xs text-text-secondary mb-1.5">Bill type</label>
      <select
        value={billType}
        onChange={(e) => handleBillChange(e.target.value)}
        className="w-full bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm text-text mb-4 focus:outline-none focus:border-accent/50"
      >
        {billOptions.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>

      <label className="block text-xs text-text-secondary mb-1.5">Amount</label>
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">₹</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-elevated border border-border rounded-lg py-2.5 pl-8 pr-3 text-sm font-mono text-text focus:outline-none focus:border-accent/50"
        />
      </div>

      <label className="block text-xs text-text-secondary mb-1.5">Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Bill description"
        className="w-full bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm text-text mb-4 focus:outline-none focus:border-accent/50"
      />

      <p className="text-sm text-text-secondary mb-1">
        Available:{' '}
        <span className="text-accent font-medium">₹{balance.toLocaleString('en-IN')}</span>
      </p>
      {insufficient && parsedAmount > 0 && (
        <p className="text-sm text-danger mb-4">Insufficient wallet balance</p>
      )}

      <motion.button
        type="button"
        onClick={handlePay}
        disabled={!isValid}
        whileHover={isMobile ? undefined : { scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className="w-full mt-4 py-2.5 text-sm font-medium rounded-[10px] bg-accent text-on-accent hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Pay ₹{parsedAmount.toLocaleString('en-IN')} from wallet
      </motion.button>

      <button
        type="button"
        onClick={onClose}
        className="w-full mt-3 text-sm text-text-secondary hover:text-text"
      >
        Cancel
      </button>
    </Modal>
  )
}
