import { useState } from 'react'
import { Home, Users, Copy, Check, Sparkles } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import { house } from '../data/mockData'
import { accentGlow } from '../lib/classes'
import PageMotion from '../components/shared/PageMotion'

export default function CreateJoinHouse() {
  const [tab, setTab] = useState('create')
  const [copied, setCopied] = useState(false)
  const [houseName, setHouseName] = useState('')
  const [joinCode, setJoinCode] = useState('')

  const copyCode = () => {
    navigator.clipboard?.writeText(house.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageMotion>
      <PageHeader
        title="House"
        subtitle="Create a new household or join an existing one"
      />

      <div className="flex gap-2 p-1 mb-8 bg-card border border-border rounded-xl w-fit">
        {['create', 'join'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
              tab === t
                ? 'bg-accent text-on-accent shadow-lg shadow-accent/20'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {t === 'create' ? 'Create house' : 'Join house'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tab === 'create' ? (
          <Card className="lg:col-span-2 max-w-2xl">
            <CardHeader
              title="Create a new house"
              subtitle="Set up your shared living space"
            />
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="House name"
                icon={Home}
                placeholder="e.g. Sunshine Flat"
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
              />
              <Input
                label="Address (optional)"
                placeholder="12 MG Road, Indore, MP"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Monthly rent (total)" type="number" placeholder="32000" />
                <Input label="Roommates" type="number" placeholder="4" />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto" icon={Sparkles}>
                Create house
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="lg:col-span-2 max-w-2xl">
            <CardHeader
              title="Join a house"
              subtitle="Enter the invite code from your roommate"
            />
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="House code"
                icon={Users}
                placeholder="SFL-4829"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="font-mono tracking-widest"
              />
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Join house
              </Button>
            </form>
          </Card>
        )}

        <Card className="lg:col-span-2">
          <CardHeader
            title="Current house"
            subtitle="You're already in a household"
            action={<Badge variant="accent">Active</Badge>}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center ${accentGlow}`}>
                <Home className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">{house.name}</h3>
                <p className="text-sm text-text-muted">{house.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <code className="text-sm font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                    {house.code}
                  </code>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="p-1.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Members</p>
              <div className="flex flex-wrap gap-3">
                {house.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card-hover border border-border">
                    <Avatar initials={member.avatar} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-text">{member.name}</p>
                      <p className="text-[10px] text-text-muted capitalize">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageMotion>
  )
}
