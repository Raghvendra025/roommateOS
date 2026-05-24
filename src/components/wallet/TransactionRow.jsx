import { motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'
import { rowVariants } from '../../lib/motion'

export default function TransactionRow({ transaction, index = 0 }) {
  const isMobile = useIsMobile()
  const isCredit = transaction.type === 'credit'

  return (
    <motion.div
      custom={index}
      variants={rowVariants(isMobile)}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
        style={{
          backgroundColor: transaction.memberColor,
          color: transaction.memberTextColor,
        }}
      >
        {transaction.memberInitials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text">{transaction.title}</p>
        <p className="text-xs text-text-secondary mt-0.5 truncate">
          {transaction.description} · {transaction.date}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className={`text-sm font-medium ${isCredit ? 'text-success' : 'text-danger'}`}>
          {isCredit ? '+' : '−'}₹{transaction.amount.toLocaleString('en-IN')}
        </p>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1, ease: 'easeOut' }}
          className={`inline-block mt-1 px-1.5 py-0.5 text-[10px] font-medium rounded ${
            isCredit ? 'text-success bg-success-bg' : 'text-danger bg-danger-bg'
          }`}
        >
          {transaction.paymentMethod}
        </motion.span>
      </div>
    </motion.div>
  )
}
