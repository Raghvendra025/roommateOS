import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, QrCode } from 'lucide-react'
import Modal from '../shared/Modal'
import useIsMobile from '../../hooks/useIsMobile'

export default function AddMoneyModal({ open, onClose, onConfirm, currentMember }) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('upi')
  const [note, setNote] = useState('')
  const isMobile = useIsMobile()

  const parsedAmount = parseFloat(amount) || 0
  const isValid = parsedAmount > 0

  const handleConfirm = () => {
    if (!isValid) return
    onConfirm({
      amount: parsedAmount,
      paymentMethod: method === 'upi' ? 'UPI' : 'Manual',
      note: method === 'manual' ? note : undefined,
      member: currentMember,
    })
    setAmount('')
    setNote('')
    setMethod('upi')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-text">Add to House Wallet</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-text-secondary hover:text-text hover:bg-elevated"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <label className="block text-xs text-text-secondary mb-2">Amount</label>
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-accent font-medium">₹</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="w-full bg-elevated border border-border rounded-lg py-4 pl-10 pr-4 text-3xl font-medium text-center text-text font-mono focus:outline-none focus:border-accent/50"
        />
      </div>

      <p className="text-xs text-text-secondary mb-2">Payment method</p>
      <div className="flex gap-2 mb-4">
        {[
          { id: 'upi', label: 'UPI' },
          { id: 'manual', label: 'Manual (cash)' },
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMethod(m.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-[10px] border transition-colors ${
              method === m.id
                ? 'border-accent text-accent bg-accent-bg'
                : 'border-border text-text-secondary bg-elevated hover:text-text'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {method === 'upi' ? (
        <div className="mb-4">
          <div className="flex flex-col items-center justify-center h-36 rounded-lg border border-border bg-elevated mb-3">
            <QrCode className="w-12 h-12 text-text-subtle mb-2" />
            <p className="text-xs text-text-secondary">Scan UPI QR to pay</p>
          </div>
          <p className="text-xs text-text-secondary">
            House UPI:{' '}
            <span className="font-mono text-accent">roommateOS@upi</span>
            <span className="text-text-ghost"> · </span>
            <span className="font-mono text-accent">rahul@okicici</span>
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-xs text-text-secondary mb-1.5">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Cash handed to Rahul Sharma"
            className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-ghost focus:outline-none focus:border-accent/50"
          />
        </div>
      )}

      <p className="text-[11px] text-text-ghost mb-4">
        After payment, click confirm to update wallet balance
      </p>

      <motion.button
        type="button"
        onClick={handleConfirm}
        disabled={!isValid}
        whileHover={isMobile ? undefined : { scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className="w-full py-2.5 text-sm font-medium rounded-[10px] bg-accent text-on-accent hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        I have paid — Confirm
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
