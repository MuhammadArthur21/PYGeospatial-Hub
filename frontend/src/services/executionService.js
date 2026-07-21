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
}
