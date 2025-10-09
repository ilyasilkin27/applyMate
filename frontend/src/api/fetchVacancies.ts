import { useState, useEffect } from 'react'
import ky from 'ky'
import type { Vacancy } from '../types/models'
import { getCityId } from '../utils/cityMapping'

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
    let retryTimer: number | undefined

    const fetchVacancies = async (attempt: number = 0) => {
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
        if (searchKeyword || searchCity) {
          const params = new URLSearchParams()
          if (searchKeyword) {
            params.append('text', searchKeyword)
          }
          if (searchCity) {
            const cityId = getCityId(searchCity)
            if (cityId) {
              params.append('area', cityId)
            }
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
        if (signal.aborted) return

        const message = err instanceof Error ? err.message : String(err)
        const isTimeout =
          (err as any)?.name === 'TimeoutError' ||
          /timed out|timeout|ETIMEDOUT/i.test(message)

        if (isTimeout && attempt < 8) {
          const delayMs = Math.min(1000 * Math.pow(2, attempt), 10000)
          retryTimer = window.setTimeout(() => {
            if (!signal.aborted) {
              fetchVacancies(attempt + 1)
            }
          }, delayMs)
          return
        }

        setError(message)
      } finally {
        if (signal.aborted) return
        if (!(retryTimer && typeof retryTimer === 'number')) {
          setLoading(false)
        }
      }
    }

    const debounceTimer = setTimeout(() => {
      if (selectedResumeId || searchKeyword || searchCity) {
        fetchVacancies(0)
      }
    }, 300)

    return () => {
      abortController.abort()
      clearTimeout(debounceTimer)
      if (retryTimer) {
        clearTimeout(retryTimer)
      }
    }
  }, [selectedResumeId, searchKeyword, searchCity])

  return { vacancies, loading, error }
}

export default useFetchVacancies
