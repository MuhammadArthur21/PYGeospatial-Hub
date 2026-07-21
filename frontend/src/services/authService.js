import api from './api'

export const authService = {
  async login(username, password) {
    const response = await api.post('/auth/login', { username, password })
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token)
    }
    return response.data
  },

  async register(username, email, password) {
    const response = await api.post('/auth/register', { username, email, password })
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token)
    }
    return response.data
  },

  async getProfile() {
    const token = localStorage.getItem('access_token')
    const response = await api.get('/auth/profile', { params: { token } })
    return response.data
  },

  async refresh() {
    const token = localStorage.getItem('access_token')
    const response = await api.post('/auth/refresh', null, { params: { token } })
    return response.data
  },

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token')
  },
}
