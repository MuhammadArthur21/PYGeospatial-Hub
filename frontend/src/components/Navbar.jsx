import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Earth, BookOpen, Wrench, PlayCircle, GraduationCap,
  FileText, LayoutDashboard, Menu, X, ChevronDown
} from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Earth },
  { path: '/libraries', label: 'Libraries', icon: BookOpen },
  { path: '/tools', label: 'Tools', icon: Wrench },
  { path: '/sandbox', label: 'Sandbox', icon: PlayCircle },
  { path: '/tutorials', label: 'Tutorials', icon: GraduationCap },
  { path: '/docs', label: 'Docs', icon: FileText },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-ocean-500 
                          flex items-center justify-center text-white font-bold text-sm
                          shadow-lg shadow-primary-500/25">
              PG
            </div>
            <span className="font-semibold text-lg hidden sm:block">
              <span className="gradient-text">PyGeospatial</span>
              <span className="text-gray-400 ml-1">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item text-sm ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="btn-ghost text-sm hidden sm:flex items-center gap-2">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link to="/dashboard" className="btn-primary text-sm">
              Get Started
            </Link>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden btn-ghost p-2"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 p-2 animate-slide-up">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
          <hr className="my-2 border-surface-700" />
          <Link
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="sidebar-item"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  )
}
