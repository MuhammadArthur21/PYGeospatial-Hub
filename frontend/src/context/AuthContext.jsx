import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('access_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token')
    const storedUser = localStorage.getItem('user_info')
    if (storedToken && storedUser) {
      setToken(storedToken)
      try { setUser(JSON.parse(storedUser)) } catch { setUser(null) }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const data = await authService.login(username, password)
    localStorage.setItem('access_token', data.access_token)
    const userInfo = { username: data.username || username }
    localStorage.setItem('user_info', JSON.stringify(userInfo))
    setToken(data.access_token)
    setUser(userInfo)
    return data
  }

  const register = async (username, email, password) => {
    const data = await authService.register(username, email, password)
    localStorage.setItem('access_token', data.access_token)
    const userInfo = { username: data.username || username, email }
    localStorage.setItem('user_info', JSON.stringify(userInfo))
    setToken(data.access_token)
    setUser(userInfo)
    return data
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
