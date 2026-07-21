import { useState, useEffect } from 'react'
import { Code, Download, Eye, Clock, BookOpen, LogIn, PlayCircle, TrendingUp, Database, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { useAuth } from '@/context/AuthContext'
import api from '@/services/api'

// Fallback demo data while backend is not connected
const demoStats = [
  { label: 'Executions Today', value: '—', icon: Code, change: 'Connect backend', color: 'from-primary-500 to-primary-300' },
  { label: 'Saved Scripts', value: '—', icon: BookOpen, change: 'Connect backend', color: 'from-primary-600 to-sage-400' },
  { label: 'Datasets Uploaded', value: '—', icon: Download, change: 'Connect backend', color: 'from-earth-600 to-earth-400' },
  { label: 'Libraries Available', value: '100+', icon: Database, change: 'Ready', color: 'from-primary-400 to-sage-300' },
]

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState(demoStats)
  const [scripts, setScripts] = useState([])
  const [executions, setExecutions] = useState([])
  const [loading, setLoading] = useState(true)

  // Try to load saved scripts from localStorage (fallback when backend is offline)
  useEffect(() => {
    setLoading(true)

    // Try backend first
    api.get('/dashboard/summary')
      .then(res => {
        const d = res.data
        if (d.executions_today !== undefined) {
          setStats([
            { label: 'Executions Today', value: String(d.executions_today ?? 0), icon: Code, change: '+today', color: 'from-primary-500 to-primary-300' },
            { label: 'Saved Scripts', value: String(d.saved_scripts ?? 0), icon: BookOpen, change: 'total', color: 'from-primary-600 to-sage-400' },
            { label: 'Datasets Uploaded', value: String(d.datasets ?? 0), icon: Download, change: 'total', color: 'from-earth-600 to-earth-400' },
            { label: 'Libraries Available', value: '100+', icon: Database, change: 'Ready', color: 'from-primary-400 to-sage-300' },
          ])
        }
      })
      .catch(() => {})

    // Load scripts from localStorage
    try {
      const localScripts = JSON.parse(localStorage.getItem('local_scripts') || '[]')
      setScripts(localScripts.slice(-5).reverse())
    } catch { setScripts([]) }

    setLoading(false)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-sage-100 dark:from-dark-accent/20 dark:to-dark-accent/10 flex items-center justify-center mx-auto mb-6">
            <LogIn size={36} className="text-primary-600 dark:text-dark-accent" />
          </div>
          <h1 className="text-2xl font-bold text-earth-900 dark:text-dark-text mb-3">Login diperlukan</h1>
          <p className="text-earth-500 dark:text-dark-accent/60 mb-6">
            Masuk untuk mengakses dashboard personal, riwayat eksekusi, dan script tersimpan kamu.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="btn-primary px-6 py-2.5">Login</Link>
            <Link to="/register" className="btn-secondary px-6 py-2.5">Daftar Gratis</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-1">
          Halo, <span className="gradient-text">{user?.username || 'Explorer'}</span> 👋
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Overview aktivitas dan penggunaan akun kamu
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-xs text-primary-600 dark:text-dark-accent font-medium">{stat.change}</span>
              </div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Saved Scripts */}
        <Card>
          <CardHeader>
            <BookOpen size={18} className="text-primary-600 dark:text-dark-accent" />
            <CardTitle>Saved Scripts</CardTitle>
          </CardHeader>
          {scripts.length > 0 ? (
            <div className="space-y-2">
              {scripts.map((script) => (
                <div key={script.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-earth-50 dark:hover:bg-dark-border transition-colors">
                  <div>
                    <p className="text-sm text-earth-800 dark:text-dark-text font-medium">{script.title}</p>
                    <p className="text-xs text-earth-400">{new Date(script.savedAt).toLocaleDateString('id-ID')}</p>
                  </div>
                  <Link to="/sandbox" className="text-xs text-primary-600 dark:text-dark-accent hover:underline">Open →</Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <BookOpen size={32} className="mx-auto text-earth-200 dark:text-dark-border mb-2" />
              <p className="text-sm text-earth-400 dark:text-dark-accent/50">Belum ada script tersimpan.</p>
            </div>
          )}
          <Link to="/sandbox" className="btn-ghost text-sm mt-4 w-full text-center flex items-center gap-2 justify-center">
            <PlayCircle size={14} /> Buat Script Baru
          </Link>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <Zap size={18} className="text-primary-600 dark:text-dark-accent" />
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {[
              { label: '🧪 Buka Sandbox', desc: 'Tulis & eksekusi kode Python geospasial', to: '/sandbox' },
              { label: '📚 Browse Libraries', desc: 'Jelajahi 100+ library geospasial', to: '/libraries' },
              { label: '🛠️ Tools Marketplace', desc: 'Tools siap pakai tanpa coding', to: '/tools' },
              { label: '👥 Community Hub', desc: 'Fork & share script dari komunitas', to: '/community' },
              { label: '📖 Tutorials', desc: 'Panduan step-by-step dari beginner', to: '/tutorials' },
            ].map(action => (
              <Link key={action.to} to={action.to}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-earth-50 dark:hover:bg-dark-border transition-colors group">
                <div>
                  <p className="text-sm font-medium text-earth-800 dark:text-dark-text">{action.label}</p>
                  <p className="text-xs text-earth-400 dark:text-dark-accent/50">{action.desc}</p>
                </div>
                <span className="text-earth-300 group-hover:text-primary-500 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Backend Connection Notice */}
      <div className="glass-card p-4 flex items-start gap-3 bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
        <TrendingUp size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Backend belum terhubung</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
            Jalankan <code className="font-mono bg-amber-100 dark:bg-amber-900/30 px-1 rounded">docker compose up -d</code> lalu{' '}
            <code className="font-mono bg-amber-100 dark:bg-amber-900/30 px-1 rounded">uvicorn app.main:app --reload</code>{' '}
            untuk mengaktifkan sandbox eksekusi dan statistik real-time.
          </p>
        </div>
      </div>
    </div>
  )
}
