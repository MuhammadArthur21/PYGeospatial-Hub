import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Earth, BookOpen, Wrench, PlayCircle, GraduationCap,
  FileText, LayoutDashboard, Menu, X, Sun, Moon, Users,
  LogIn, LogOut, UserCircle, Zap, RefreshCw
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import UpgradeModal from '@/components/UpgradeModal'

const navItems = [
  { path: '/', label: 'Home', icon: Earth },
  { path: '/libraries', label: 'Libraries', icon: BookOpen },
  { path: '/tools', label: 'Tools', icon: Wrench },
  { path: '/sandbox', label: 'Sandbox', icon: PlayCircle },
  { path: '/converter', label: 'Converter', icon: RefreshCw },
  { path: '/tutorials', label: 'Tutorials', icon: GraduationCap },
  { path: '/docs', label: 'Docs', icon: FileText },
  { path: '/community', label: 'Community', icon: Users },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  useEffect(() => {
    const handler = (e) => { if (!e.target.closest('#user-menu-container')) setUserMenuOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-earth-200 dark:bg-dark-surface/90 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-300 dark:from-dark-accent dark:to-dark-text flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary-500/20">
                PG
              </div>
              <span className="font-semibold text-lg hidden sm:block">
                <span className="gradient-text">PyGeospatial</span>
                <span className="text-earth-500 dark:text-dark-accent ml-1">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link key={item.path} to={item.path}
                    className={`sidebar-item text-sm ${isActive ? 'active' : ''}`}>
                    <Icon size={15} />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Quota Counter Badge */}
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                title="Sisa Kuota Eksekusi Sandbox Harian"
              >
                <Zap size={13} className="fill-current text-amber-500" />
                <span>3/5 Free Runs</span>
              </button>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="btn-ghost p-2 rounded-lg" aria-label="Toggle theme">
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {isAuthenticated ? (
                <>
                  {/* Dashboard link */}
                  <Link to="/dashboard" className="btn-ghost text-sm hidden sm:flex items-center gap-1.5">
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>

                  {/* User Menu */}
                  <div id="user-menu-container" className="relative">
                    <button onClick={() => setUserMenuOpen(v => !v)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-earth-100 dark:hover:bg-dark-border transition-colors">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-sage-400 flex items-center justify-center text-white text-xs font-semibold">
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm text-earth-700 dark:text-dark-text hidden sm:block max-w-[80px] truncate">
                        {user?.username}
                      </span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-dark-surface border border-earth-200 dark:border-dark-border rounded-xl shadow-lg py-1 z-50">
                        <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-earth-700 dark:text-dark-text hover:bg-earth-50 dark:hover:bg-dark-border">
                          <LayoutDashboard size={14} /> Dashboard
                        </Link>
                        <button
                          onClick={() => { setUserMenuOpen(false); setUpgradeModalOpen(true) }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                        >
                          <Zap size={14} /> Upgrade Pro
                        </button>
                        <hr className="my-1 border-earth-100 dark:border-dark-border" />
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10">
                          <LogOut size={14} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost text-sm hidden sm:flex items-center gap-1.5">
                    <LogIn size={15} /> Login
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Get Started
                  </Link>
                </>
              )}

              {/* Mobile menu toggle */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden btn-ghost p-2">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden glass-card mx-4 mb-4 p-2 animate-slide-up">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}>
                  <Icon size={18} /> {item.label}
                </Link>
              )
            })}
            <hr className="my-2 border-earth-200 dark:border-dark-border" />
            <button
              onClick={() => { setMobileOpen(false); setUpgradeModalOpen(true) }}
              className="sidebar-item w-full text-amber-600 dark:text-amber-400 flex items-center gap-2"
            >
              <Zap size={18} /> Upgrade Pro Plan
            </button>
          </div>
        )}
      </nav>

      {/* Upgrade Subscription Modal */}
      <UpgradeModal isOpen={upgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} />
    </>
  )
}
