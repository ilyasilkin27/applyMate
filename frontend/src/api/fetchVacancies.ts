import { useState, useEffect } from 'react'

export interface Vacancy {
  id: string
  name: string
  employer?: { name?: string }
  salary?: { from?: number; to?: number; currency?: string }
  published_at: string
  alternate_url: string
  has_test?: boolean
}

interface VacanciesResponse {
  items: Vacancy[]
}

const useFetchVacancies = (
  selectedResumeId?: string,
  searchKeyword?: string
) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true)
      setError(null)
      try {
        const accessToken = sessionStorage.getItem('access_token')
        if (!accessToken) {
          throw new Error('no access token')
        }

        const url = searchKeyword
          ? `https://applymate-vacancies-service.onrender.com/api/vacancies/search?text=${encodeURIComponent(
              searchKeyword
            )}`
          : `https://applymate-vacancies-service.onrender.com/api/vacancies/${selectedResumeId}/similar_vacancies`

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('auth error: check access token')
          }
          if (response.status === 502) {
            throw new Error(
              'service error: vacancies service is temporarily unavailable'
            )
          }
          throw new Error('Ошибка сети')
        }

        const data: VacanciesResponse = await response.json()
        setVacancies(data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    if (selectedResumeId || searchKeyword) {
      const debounceTimer = setTimeout(() => {
        fetchVacancies()
      }, 300)

      return () => clearTimeout(debounceTimer)
    }
  }, [selectedResumeId, searchKeyword])

  return { vacancies, loading, error }
}

export default useFetchVacancies
