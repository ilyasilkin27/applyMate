import { useState, useEffect } from 'react'
import ky from 'ky'
import type { Resume } from '../types/models'

interface FetchResumesResult {
  resumes: Resume[]
  loading: boolean
  error: string | null
}

const useFetchResumes = (): FetchResumesResult => {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const fetchResumes = async (attempt = 0) => {
      const accessToken = sessionStorage.getItem('access_token')
      if (!accessToken) {
        if (attempt < 3) {
          setTimeout(() => fetchResumes(attempt + 1), 300)
          return
        }
        setError('No access token')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const cacheKey = `resumes_${accessToken.slice(0, 8)}`
        const cached = sessionStorage.getItem(cacheKey)

        if (cached) {
          setResumes(JSON.parse(cached))
          setLoading(false)
        }

        const data = await ky
          .get(
            'https://applymate-resume-service.onrender.com/api/resumes/getResumes',
            {
              headers: { Authorization: `Bearer ${accessToken}` },
              signal,
              timeout: 5000,
              retry: {
                limit: 2,
                methods: ['get'],
                statusCodes: [408, 500, 502, 503, 504],
              },
            }
          )
          .json<{ items: Resume[] }>()

        setResumes(data.items || [])
        sessionStorage.setItem(cacheKey, JSON.stringify(data.items || []))
      } catch (err) {
        if (!signal.aborted) {
          setError(err instanceof Error ? err.message : String(err))
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchResumes()
    return () => abortController.abort()
  }, [])

  return { resumes, loading, error }
}

export default useFetchResumes
