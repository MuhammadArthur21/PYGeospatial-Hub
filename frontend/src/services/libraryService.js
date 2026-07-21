import api from './api'

export const libraryService = {
  async list(params = {}) {
    const response = await api.get('/libraries', { params })
    return response.data
  },

  async get(id) {
    const response = await api.get(`/libraries/${id}`)
    return response.data
  },

  async listCategories() {
    const response = await api.get('/categories')
    return response.data
  },
}
