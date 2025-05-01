import { useState, useEffect } from 'react';
import type { Vacancy } from '../types/models'

interface FetchVacanciesResult {
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
}

const useFetchVacancies = (
  selectedResumeId: string | null,
  searchKeyword: string | null
): FetchVacanciesResult => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('no access token');
        }

        const url = searchKeyword
          ? `https://applymate-vacancies-service.onrender.com/api/vacancies/search?text=${searchKeyword}`
          : `https://applymate-vacancies-service.onrender.com/api/vacancies/${selectedResumeId}/similar_vacancies`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('auth error: check access token');
          }
          if (response.status === 502) {
            throw new Error('service error: vacancies service is temporarily unavailable');
          }
          throw new Error('Ошибка сети');
        }

        const data = await response.json();
        setVacancies(data.items as Vacancy[] || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    if (selectedResumeId || searchKeyword) {
      const debounceTimer = setTimeout(() => {
        fetchVacancies();
      }, 300);

      return () => clearTimeout(debounceTimer);
    }
  }, [selectedResumeId, searchKeyword]);

  return { vacancies, loading, error };
};

export default useFetchVacancies;