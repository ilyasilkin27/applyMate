import { useState, useEffect } from "react";

export default () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        
        const response = await fetch("https://applymate-resume-service.onrender.com/api/resumes/getResumes", {
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResumes(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return { resumes, loading, error };
};
