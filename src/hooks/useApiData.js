import { useState, useEffect, useCallback } from 'react'

/**
 * Generic data-fetching hook.
 * Usage:
 *   const { data, loading, error, refetch } = useApiData(fetchFn, [deps])
 *
 * - fetchFn: async function returning { data: { ... } }
 * - skip: if true, won't fetch (e.g. when houseId is not yet known)
 */
export default function useApiData(fetchFn, deps = [], { skip = false } = {}) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError]     = useState(null)

  const fetch = useCallback(async () => {
    if (skip) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const res = await fetchFn()
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch, setData }
}
