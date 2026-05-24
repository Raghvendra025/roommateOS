import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDemo } from '../../context/DemoContext'

/**
 * Allows access if:
 *  - User is authenticated (real login), OR
 *  - Demo mode is active
 * Otherwise redirects to /login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const { isDemo } = useDemo()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !isDemo) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
