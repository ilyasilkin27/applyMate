import { useState, useEffect } from 'react';
import ky from 'ky';

export interface Vacancy {
  id: string;
  name: string;
  has_test?: boolean;
}

interface FetchVacanciesResult {
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
}

const useFetchVacancies = (selectedResumeId: string | null, searchKeyword: string): FetchVacanciesResult => {
  const [vacancies, setVacancies] = useState<Vacancy[]> ([]);
  const [loading, setLoading] = useState(false);
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

        const data = await ky
          .get(url, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          })
          .json<{ items: Vacancy[] }>();

        setVacancies(data.items || []);
      } catch (err) {
        if ((err as Error).name === 'HTTPError') {
          const httpError = err as { response: { status: number } };
          if (httpError.response.status === 401) {
            setError('auth error: check access token');
          } else if (httpError.response.status === 502) {
            setError('service error: vacancies service is temporarily unavailable');
          } else {
            setError('Ошибка сети');
          }
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
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