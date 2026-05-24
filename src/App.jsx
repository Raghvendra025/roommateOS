import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/shared/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Groceries from './pages/Groceries'
import Chores from './pages/Chores'
import Rent from './pages/Rent'
import Notifications from './pages/Notifications'
import CreateJoinHouse from './pages/CreateJoinHouse'
import HouseWallet from './pages/HouseWallet'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected — requires real auth OR demo mode */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/wallet"        element={<HouseWallet />} />
          <Route path="/expenses"      element={<Expenses />} />
          <Route path="/groceries"     element={<Groceries />} />
          <Route path="/chores"        element={<Chores />} />
          <Route path="/rent"          element={<Rent />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/house"         element={<CreateJoinHouse />} />
        </Route>

        <Route path="/"  element={<Navigate to="/login" replace />} />
        <Route path="*"  element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
