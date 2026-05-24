import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import Sidebar from './Sidebar'

export default function MobileNav({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-bg border-r border-border flex flex-col animate-in">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <Sidebar className="flex h-full w-full" />
      </div>
    </div>
  )
}
