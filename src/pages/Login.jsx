import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail, Lock, Sparkles, ArrowRight, User, Phone,
  AlertCircle, Loader2, Play, Zap,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { cardBase, accentGlow } from '../lib/classes'
import PageMotion from '../components/shared/PageMotion'
import { useAuth } from '../context/AuthContext'
import { useDemo } from '../context/DemoContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register, error, setError } = useAuth()
  const { enterDemo } = useDemo()

  const from = location.state?.from?.pathname || '/dashboard'

  // ─── Tab state ────────────────────────────────────────────────────────────
  const [tab, setTab] = useState('login')

  // ─── Login form state ─────────────────────────────────────────────────────
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  // ─── Register form state ──────────────────────────────────────────────────
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: '',
  })

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const clearErrors = () => { setFormError(''); setError(null) }

  // ─── Demo mode ────────────────────────────────────────────────────────────
  const handleDemo = () => {
    enterDemo()
    navigate('/dashboard')
  }

  // ─── Login ────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault()
    clearErrors()
    if (!loginForm.email || !loginForm.password) {
      setFormError('Please enter your email and password')
      return
    }
    setLoading(true)
    try {
      await login({ email: loginForm.email, password: loginForm.password })
      navigate(from, { replace: true })
    } catch (err) {
      setFormError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Register ─────────────────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault()
    clearErrors()
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setFormError('Please fill in all required fields')
      return
    }
    if (registerForm.password.length < 6) {
      setFormError('Password must be at least 6 characters')
      return
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setFormError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        phone: registerForm.phone,
      })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setFormError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const displayError = formError || error

  return (
    <div className="min-h-screen flex">

      {/* ─── Left panel ──────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden border-r border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-muted/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center p-16 max-w-lg">
          <div className="flex items-center gap-2.5 mb-8">
            <div className={`w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center ${accentGlow}`}>
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xl font-semibold text-text">RoommateOS</span>
          </div>
          <h1 className="text-4xl font-semibold text-text tracking-tight leading-tight">
            Shared living,<br />
            <span className="text-accent">simplified.</span>
          </h1>
          <p className="text-text-secondary mt-4 text-lg leading-relaxed">
            Split expenses, track chores, manage rent, and keep your household in perfect sync.
          </p>

          {/* Demo CTA on left panel */}
          <motion.button
            type="button"
            onClick={handleDemo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 flex items-center gap-3 p-4 rounded-2xl
                       bg-gradient-to-r from-amber-500/10 to-orange-500/10
                       border border-amber-500/25 hover:border-amber-500/50
                       text-left group transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text">Try the demo →</p>
              <p className="text-xs text-text-muted mt-0.5">Full dashboard with sample data. No signup needed.</p>
            </div>
          </motion.button>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { label: 'Houses', value: '12k+' },
              { label: 'Settled', value: '₹4.2 Cr' },
              { label: 'Rating', value: '4.9★' },
            ].map((stat) => (
              <div key={stat.label} className={`${cardBase} p-4 text-center`}>
                <p className="text-lg font-semibold text-text">{stat.value}</p>
                <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Right panel: form ───────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <PageMotion className="w-full max-w-md">

          {/* Logo (mobile) */}
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <span className="text-lg font-semibold text-text">RoommateOS</span>
          </div>

          {/* ── Try Demo button (mobile + desktop) ──────────────────────── */}
          <motion.button
            type="button"
            onClick={handleDemo}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-5 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl
                       bg-gradient-to-r from-amber-500/10 to-orange-500/10
                       border border-amber-500/30 hover:border-amber-500/60
                       text-amber-600 dark:text-amber-400 font-semibold text-sm
                       transition-all duration-200 group"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Zap className="w-4 h-4" />
            </motion.div>
            Try Demo — explore without signing up
          </motion.button>

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-text-muted">or sign in</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* ── Tab switcher ─────────────────────────────────────────────── */}
          <div className="flex gap-1 p-1 mb-6 bg-card border border-border rounded-xl">
            {['login', 'register'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); clearErrors() }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                  tab === t
                    ? 'bg-accent text-on-accent shadow-lg shadow-accent/20'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {t === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          {/* ── Error banner ─────────────────────────────────────────────── */}
          {displayError && (
            <div className="flex items-start gap-2.5 p-3 mb-5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{displayError}</span>
            </div>
          )}

          {/* ════════════ LOGIN FORM ════════════ */}
          {tab === 'login' && (
            <>
              <h2 className="text-2xl font-semibold text-text tracking-tight">Welcome back</h2>
              <p className="text-sm text-text-muted mt-1 mb-6">Sign in to your household dashboard</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label="Email" type="email" icon={Mail}
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="you@gmail.com" required
                />
                <Input
                  label="Password" type="password" icon={Lock}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••" required
                />
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                    <input type="checkbox" className="rounded border-border bg-card text-accent focus:ring-accent/30" defaultChecked />
                    Remember me
                  </label>
                  <a href="#" className="text-accent hover:text-accent/80 transition-colors">Forgot password?</a>
                </div>
                <Button type="submit" size="lg" className="w-full" icon={loading ? Loader2 : ArrowRight} disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </>
          )}

          {/* ════════════ REGISTER FORM ════════════ */}
          {tab === 'register' && (
            <>
              <h2 className="text-2xl font-semibold text-text tracking-tight">Create your account</h2>
              <p className="text-sm text-text-muted mt-1 mb-6">Join RoommateOS and set up your household</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  label="Full name" type="text" icon={User}
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  placeholder="Alex Johnson" required
                />
                <Input
                  label="Email" type="email" icon={Mail}
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  placeholder="you@gmail.com" required
                />
                <Input
                  label="Phone (optional)" type="tel" icon={Phone}
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
                <Input
                  label="Password" type="password" icon={Lock}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  placeholder="Min 6 characters" required
                />
                <Input
                  label="Confirm password" type="password" icon={Lock}
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  placeholder="Repeat your password" required
                />
                <Button type="submit" size="lg" className="w-full" icon={loading ? Loader2 : ArrowRight} disabled={loading}>
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
            </>
          )}

          <p className="text-center text-xs text-text-muted mt-6">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); clearErrors() }}
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              {tab === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>

        </PageMotion>
      </div>
    </div>
  )
}
