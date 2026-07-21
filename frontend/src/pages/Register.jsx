import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Eye, EyeOff, Loader, UserPlus } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.email || !form.password) { setError('Semua field wajib diisi.'); return }
    if (form.password !== form.confirm) { setError('Password tidak cocok.'); return }
    if (form.password.length < 6) { setError('Password minimal 6 karakter.'); return }
    setLoading(true)
    setError('')
    try {
      await register(form.username, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registrasi gagal. Coba lagi.')
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
          <h1 className="mt-6 text-2xl font-bold text-earth-900 dark:text-dark-text">Buat akun gratis</h1>
          <p className="mt-1 text-earth-500 dark:text-dark-accent/60 text-sm">Mulai eksplorasi geospasial tanpa instalasi</p>
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
              <input id="reg-username" type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="username unik kamu" className="input-field w-full" autoComplete="username" />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-dark-text mb-1">Email</label>
              <input id="reg-email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="email@contoh.com" className="input-field w-full" autoComplete="email" />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-dark-text mb-1">Password</label>
              <div className="relative">
                <input id="reg-password" type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 6 karakter" className="input-field w-full pr-10" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-dark-text mb-1">Konfirmasi Password</label>
              <input id="reg-confirm" type="password" value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                placeholder="Ulangi password" className="input-field w-full" autoComplete="new-password" />
            </div>

            <button id="reg-submit" type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5">
              {loading ? <Loader size={16} className="animate-spin" /> : <UserPlus size={16} />}
              {loading ? 'Membuat akun...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-earth-500 dark:text-dark-accent/60">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-primary-600 dark:text-dark-accent font-medium hover:underline">Login</Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-primary-50 dark:bg-dark-accent/10 rounded-lg text-xs text-center text-earth-600 dark:text-dark-accent/70">
            🎉 Tier <strong>Free</strong>: 5 eksekusi/hari · 50 MB storage · Semua library dasar
          </div>
        </div>
      </div>
    </div>
  )
}
