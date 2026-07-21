import { useState, useEffect } from 'react'
import { libraryService } from '@/services/libraryService'

export function useLibraries(params = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    libraryService
      .list(params)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [JSON.stringify(params)])

  return { data, loading, error }
}
