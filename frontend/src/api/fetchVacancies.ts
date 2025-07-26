import { useState, useEffect } from 'react'
import ky from 'ky'
import type { Vacancy } from '../types/models'

interface FetchVacanciesResult {
  vacancies: Vacancy[]
  loading: boolean
  error: string | null
}

const useFetchVacancies = (
  selectedResumeId: string | null,
  searchKeyword: string | null,
  searchCity: string | null
): FetchVacanciesResult => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    const fetchVacancies = async () => {
      setLoading(true)
      setError(null)

      try {
        const accessToken = sessionStorage.getItem('access_token')
        if (!accessToken) {
          throw new Error('No access token')
        }

        const cacheKey = `vacancies_${selectedResumeId || 'search'}_${
          searchKeyword || 'none'
        }_${searchCity || 'none'}`
        const cached = sessionStorage.getItem(cacheKey)

        if (cached) {
          setVacancies(JSON.parse(cached))
          setLoading(false)
        }

        let url: string
        if (searchKeyword) {
          const params = new URLSearchParams()
          params.append('text', searchKeyword)
          if (searchCity) {
            params.append('area', searchCity)
          }
          url = `https://applymate-vacancies-service.onrender.com/api/vacancies/search?${params.toString()}`
        } else {
          url = `https://applymate-vacancies-service.onrender.com/api/vacancies/${selectedResumeId}/similar_vacancies`
        }

        const data = await ky
          .get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            signal,
            timeout: 5000,
            retry: {
              limit: 2,
              methods: ['get'],
              statusCodes: [408, 500, 502, 503, 504],
            },
          })
          .json<{ items: Vacancy[] }>()

        setVacancies(data.items || [])
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

    const debounceTimer = setTimeout(() => {
      if (selectedResumeId || searchKeyword || searchCity) {
        fetchVacancies()
      }
    }, 300)

    return () => {
      abortController.abort()
      clearTimeout(debounceTimer)
    }
  }, [selectedResumeId, searchKeyword, searchCity])

  return { vacancies, loading, error }
}

export default useFetchVacancies
