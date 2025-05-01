import { useState, useEffect } from 'react'
import ky from 'ky'
import type { Resume } from '../types/models'

interface FetchResumesResult {
  resumes: Resume[]
  loading: boolean
  error: string | null
  hasLoadedOnce: boolean
}

const useFetchResumes = (): FetchResumesResult => {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoadedOnce, setHasLoadedOnce] = useState<boolean>(false)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const fetchResumes = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const accessToken = sessionStorage.getItem('access_token')
        const data = await ky
          .get('https://applymate-resume-service.onrender.com/api/resumes/getResumes', {
            headers: { Authorization: `Bearer ${accessToken}` },
            retry: {
              limit: 3,
              methods: ['get'],
              statusCodes: [500],
              delay: (attemptCount) => 1000 * attemptCount,
            },
            signal,
            timeout: 10000,
          })
          .json<{ items: Resume[] }>()

        setResumes(data.items || [])
        setHasLoadedOnce(true)
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

    return () => {
      abortController.abort()
    }
  }, [])

  return { resumes, loading, error, hasLoadedOnce }
}

export default useFetchResumes
