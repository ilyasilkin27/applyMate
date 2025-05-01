import { useState, useEffect } from 'react'
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
  const [retryCount, setRetryCount] = useState<number>(0)
  const [hasLoadedOnce, setHasLoadedOnce] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setResumes([])
    setError(null)

    const fetchResumes = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token')
        const response = await fetch(
          'https://applymate-resume-service.onrender.com/api/resumes/getResumes',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        if (!response.ok) {
          if (response.status === 500 && retryCount < 3) {
            setTimeout(() => setRetryCount((c) => c + 1), 1000)
            return
          }
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (isMounted) setResumes((data.items as Resume[]) || [])
      } catch (err) {
        if (isMounted)
          setError(err instanceof Error ? err.message : String(err))
      } finally {
        if (isMounted) {
          setLoading(false)
          setHasLoadedOnce(true)
        }
      }
    }

    fetchResumes()

    return () => {
      isMounted = false
    }
  }, [retryCount])

  return { resumes, loading, error, hasLoadedOnce }
}

export default useFetchResumes
