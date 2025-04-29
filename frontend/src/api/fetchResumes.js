import { useState, useEffect } from 'react'

export default () => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isMounted = true
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
        if (isMounted) setResumes(data.items || [])
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchResumes()

    return () => {
      isMounted = false
    }
  }, [retryCount])

  return { resumes, loading, error }
}
