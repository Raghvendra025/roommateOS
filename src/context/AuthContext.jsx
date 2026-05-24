import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/api'
import { connectSocket, disconnectSocket } from '../services/socket'

const AuthContext = createContext(null)

// ─── Helper: persist to localStorage ─────────────────────────────────────────
const persistAuth = (token, user) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const stored = getStoredAuth()

  const [user, setUser] = useState(stored.user)
  const [token, setToken] = useState(stored.token)
  const [loading, setLoading] = useState(!!stored.token) // true if we need to verify token
  const [error, setError] = useState(null)

  // Verify token on mount — re-fetch user from /auth/me
  useEffect(() => {
    if (!stored.token) {
      setLoading(false)
      return
    }

    authAPI.getMe()
      .then(({ data }) => {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        connectSocket(stored.token)
      })
      .catch(() => {
        // Token expired or invalid
        clearAuth()
        setUser(null)
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Register ───────────────────────────────────────────────────────────
  const register = useCallback(async ({ name, email, password, phone }) => {
    setError(null)
    const { data } = await authAPI.register({ name, email, password, phone })
    persistAuth(data.token, data.user)
    setToken(data.token)
    setUser(data.user)
    connectSocket(data.token)
    return data
  }, [])

  // ─── Login ──────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setError(null)
    const { data } = await authAPI.login({ email, password })
    persistAuth(data.token, data.user)
    setToken(data.token)
    setUser(data.user)
    connectSocket(data.token)
    return data
  }, [])

  // ─── Logout ─────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearAuth()
    setUser(null)
    setToken(null)
    disconnectSocket()
  }, [])

  // ─── Update user in context (after profile edit, joining house, etc.) ───
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }, [])

  const value = {
    user,
    token,
    loading,
    error,
    setError,
    isAuthenticated: !!token && !!user,
    hasHouse: !!user?.currentHouse,
    register,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

export default AuthContext
