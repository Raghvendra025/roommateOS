import { motion } from 'framer-motion'
import { Calendar, DollarSign, Users, CheckCircle2, Clock } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import StatCard from '../components/ui/StatCard'
import ProgressBar from '../components/ui/ProgressBar'
import PageMotion from '../components/shared/PageMotion'
import AnimatedNumber from '../components/shared/AnimatedNumber'
import useIsMobile from '../hooks/useIsMobile'
import { rentHistory, house, RENT_TOTAL, RENT_PER_PERSON } from '../data/mockData'
import { containerVariants, cardVariants, rowVariants, listContainerVariants } from '../lib/motion'

export default function Rent() {
  const isMobile = useIsMobile()
  const upcoming = rentHistory.find((r) => r.status === 'upcoming')
  const monthlyRent = RENT_TOTAL
  const paidCount = rentHistory.filter((r) => r.status === 'paid').length
  const rentProgress = (paidCount / rentHistory.length) * 100

  return (
    <PageMotion>
      <PageHeader
        title="Rent"
        subtitle={`${house.name} · ₹${monthlyRent.toLocaleString('en-IN')}/month`}
        action={<Button>Record payment</Button>}
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatCard
          label="Monthly rent"
          change={`₹${RENT_PER_PERSON.toLocaleString('en-IN')} per person`}
          trend="up"
          icon={DollarSign}
          numericValue={monthlyRent}
          variants={cardVariants(isMobile)}
        />
        <StatCard
          label="Next due"
          value={upcoming?.dueDate || 'Jun 1'}
          change="12 days remaining"
          trend="up"
          icon={Calendar}
          variants={cardVariants(isMobile)}
        />
        <StatCard
          label="Roommates"
          value={house.members.length}
          change="Equal split"
          trend="up"
          icon={Users}
          variants={cardVariants(isMobile)}
        />
      </motion.div>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary">Rent collected this year</span>
          <span className="text-sm font-medium text-text">
            <AnimatedNumber value={paidCount * RENT_TOTAL} duration={1200} />
          </span>
        </div>
        <ProgressBar value={rentProgress} max={100} animated />
        <p className="text-xs text-text-secondary mt-2">
          {paidCount} of {rentHistory.length} months paid
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" padding={false}>
          <div className="p-5 border-b border-border">
            <CardHeader title="Payment history" subtitle="Monthly rent records" />
          </div>
          <motion.div className="divide-y divide-border-subtle" variants={listContainerVariants} initial="hidden" animate="visible">
            {rentHistory.map((record, index) => (
              <motion.div
                key={record.id}
                custom={index}
                variants={rowVariants(isMobile)}
                className="flex items-center gap-4 px-5 py-4 hover:bg-card-hover transition-colors"
              >
                <div className={`p-2.5 rounded-lg ${record.status === 'paid' ? 'bg-success/10 border border-success/20' : 'bg-accent/10 border border-accent/20'}`}>
                  {record.status === 'paid' ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <Clock className="w-4 h-4 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text">{record.month}</p>
                  <p className="text-xs text-text-muted">
                    Due {record.dueDate}
                    {record.paidBy && ` · Paid by ${record.paidBy}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text">₹{record.amount.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-text-muted">₹{record.perPerson.toLocaleString('en-IN')}/person</p>
                </div>
                <Badge variant={record.status === 'paid' ? 'success' : 'accent'}>
                  {record.status}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </Card>

        <Card>
          <CardHeader title="Split breakdown" subtitle="Per roommate" />
          <div className="space-y-4">
            {house.members.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar initials={member.avatar} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{member.name}</p>
                  <p className="text-xs text-text-muted capitalize">{member.role}</p>
                </div>
                <span className="text-sm font-medium text-text">₹{RENT_PER_PERSON.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-xs text-accent font-medium">June rent upcoming</p>
            <p className="text-sm text-text-secondary mt-1">
              Your share: <span className="text-text font-semibold">₹{RENT_PER_PERSON.toLocaleString('en-IN')}</span>
            </p>
            <Button size="sm" className="w-full mt-3">Mark as paid</Button>
          </div>
        </Card>
      </div>
    </PageMotion>
  )
}
