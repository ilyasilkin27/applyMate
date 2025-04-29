import { useState, useEffect } from 'react'

export default () => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

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
            setTimeout(() => setRetryCount((c) => c + 1), 500)
            return
          }
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (isMounted) setResumes(data.items || [])
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : String(err))
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