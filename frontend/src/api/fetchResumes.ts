import { useState, useEffect } from 'react';
import ky from 'ky';
import type { Resume } from '../types/models';

interface FetchResumesResult {
  resumes: Resume[];
  loading: boolean;
  error: string | null;
}

const useFetchResumes = (): FetchResumesResult => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchResumes = async () => {
      const accessToken = sessionStorage.getItem('access_token');
      if (!accessToken) {
        setLoading(false);
        setError('No access token');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const cacheKey = `resumes_${accessToken.slice(0, 8)}`;
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached) {
          setResumes(JSON.parse(cached));
          setLoading(false);
        }

        const data = await ky
          .get('https://applymate-resume-service.onrender.com/api/resumes/getResumes', {
            headers: { Authorization: `Bearer ${accessToken}` },
            signal,
            timeout: 5000,
          })
          .json<{ items: Resume[] }>();

        setResumes(data.items || []);
        sessionStorage.setItem(cacheKey, JSON.stringify(data.items || []));
      } catch (err) {
        if (!signal.aborted) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(fetchResumes, 100);
    return () => {
      abortController.abort();
      clearTimeout(timer);
    };
  }, []);

  return { resumes, loading, error };
};

export default useFetchResumes;