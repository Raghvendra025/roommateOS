import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MobileNav from './MobileNav'
import DemoModeBanner from '../shared/DemoModeBanner'

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Demo mode banner — shows above everything */}
      <DemoModeBanner />

      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
