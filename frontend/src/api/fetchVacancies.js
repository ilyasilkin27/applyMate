import { useState, useEffect } from 'react';

export default (selectedResumeId, searchKeyword) => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const accessToken = sessionStorage.getItem('access_token');
        
        if (!accessToken) {
          throw new Error('Токен доступа не найден');
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
            throw new Error('Ошибка авторизации: проверьте токен доступа');
          }
          if (response.status === 502) {
            throw new Error('Сервис вакансий временно недоступен');
          }
          throw new Error('Ошибка сети');
        }

        const data = await response.json();
        setVacancies(data.items || []);
      } catch (err) {
        setError(err.message);
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