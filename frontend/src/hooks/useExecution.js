import { useState } from 'react'
import { executionService } from '@/services/executionService'

export function useExecution() {
  const [executing, setExecuting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const execute = async (code, libraries) => {
    setExecuting(true)
    setError(null)
    try {
      const response = await executionService.execute(code, libraries)
      setResult(response)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setExecuting(false)
    }
  }

  return { execute, executing, result, error }
}
