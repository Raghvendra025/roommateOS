import { motion } from 'framer-motion'

export default function MemberContribution({ member, totalContributed }) {
  const pct = totalContributed > 0 ? (member.contributed / totalContributed) * 100 : 0

  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
          style={{ backgroundColor: member.color, color: member.textColor }}
        >
          {member.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-text">{member.name}</p>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-medium text-text">
                ₹{member.contributed.toLocaleString('en-IN')}
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1, ease: 'easeOut' }}
                className="text-[10px] font-medium text-success bg-success-bg px-1.5 py-0.5 rounded"
              >
                Paid
              </motion.span>
            </div>
          </div>
          <div className="mt-2 h-1 rounded-full bg-elevated overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
