import { useState, useEffect } from 'react';
import ky from 'ky';

interface Resume {
  id: string;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface FetchResumesResult {
  resumes: Resume[];
  loading: boolean;
  error: string | null;
}

const useFetchResumes = (): FetchResumesResult => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        
        const data = await ky
          .get('https://applymate-resume-service.onrender.com/api/resumes/getResumes', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          .json<{ items: Resume[] }>();
        
        setResumes(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return { resumes, loading, error };
};

export default useFetchResumes; 