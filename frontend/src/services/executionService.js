import api from './api'

export const executionService = {
  async execute(code, libraries = [], datasetId = null) {
    const response = await api.post('/sandbox/execute', {
      code,
      libraries,
      dataset_id: datasetId,
    })
    return response.data
  },

  async getStatus(executionId) {
    const response = await api.get(`/sandbox/executions/${executionId}`)
    return response.data
  },

  async getVisualization(executionId) {
    const response = await api.get(`/visualizations/${executionId}`)
    return response.data
  },

  /**
   * Save script locally (backend save endpoint may not be available).
   * Returns the saved script object.
   */
  async saveScript(title, code, description = '', isPublic = false) {
    const script = {
      id: Date.now().toString(),
      title,
      code,
      description,
      isPublic,
      savedAt: new Date().toISOString(),
    }

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('local_scripts') || '[]')
      existing.unshift(script)
      localStorage.setItem('local_scripts', JSON.stringify(existing))
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }

    return script
  },

  /**
   * Get all locally saved scripts.
   */
  getSavedScripts() {
    try {
      return JSON.parse(localStorage.getItem('local_scripts') || '[]')
    } catch {
      return []
    }
  },

  /**
   * Delete a saved script by ID.
   */
  deleteScript(id) {
    try {
      const scripts = JSON.parse(localStorage.getItem('local_scripts') || '[]')
      const filtered = scripts.filter(s => s.id !== id)
      localStorage.setItem('local_scripts', JSON.stringify(filtered))
      return true
    } catch {
      return false
    }
  },
}
