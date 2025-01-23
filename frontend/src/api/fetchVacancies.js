import { useState, useEffect } from 'react';

export default (selectedResumeId, searchKeyword) => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const url = searchKeyword
          ? `http://localhost:5002/api/vacancies/search?text=${searchKeyword}`
          : `http://localhost:5002/api/vacancies/${selectedResumeId}/similar_vacancies`;

        const response = await fetch(url, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
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