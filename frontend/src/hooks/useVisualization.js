import { useState } from 'react'
import { executionService } from '@/services/executionService'

export function useVisualization() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const load = async (executionId) => {
    setLoading(true)
    try {
      const viz = await executionService.getVisualization(executionId)
      setData(viz)
      return viz
    } finally {
      setLoading(false)
    }
  }

  return { load, loading, data }
}
