import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Eye, EyeOff, Loader, LogIn } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) { setError('Username dan password wajib diisi.'); return }
    setLoading(true)
    setError('')
    try {
      await login(form.username, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login gagal. Periksa username dan password kamu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-sage-400 flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-earth-900 dark:text-dark-text">
              Py<span className="text-primary-600">Geospatial</span> Hub
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-earth-900 dark:text-dark-text">Selamat datang kembali</h1>
          <p className="mt-1 text-earth-500 dark:text-dark-accent/60 text-sm">Login untuk mengakses sandbox & tools kamu</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg text-sm text-rose-700 dark:text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-dark-text mb-1">Username</label>
              <input
                id="login-username"
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="username kamu"
                className="input-field w-full"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-dark-text mb-1">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-field w-full pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
            >
              {loading ? <Loader size={16} className="animate-spin" /> : <LogIn size={16} />}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-earth-500 dark:text-dark-accent/60">
              Belum punya akun?{' '}
              <Link to="/register" className="text-primary-600 dark:text-dark-accent font-medium hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="mt-4 p-3 bg-primary-50 dark:bg-dark-accent/10 rounded-lg text-xs text-earth-600 dark:text-dark-accent/70 text-center">
            💡 Backend harus berjalan di <code className="font-mono">localhost:8000</code> untuk login nyata.
          </div>
        </div>
      </div>
    </div>
  )
}
