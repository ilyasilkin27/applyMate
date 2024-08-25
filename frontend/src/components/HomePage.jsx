import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import ResumeList from "./ResumeList";

const HomePage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("http://localhost:3001/resumes", {
          credentials: "include",
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

  return (
    <Container className="mt-4">
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && resumes.length === 0 && (
        <Alert variant="info">No resumes found.</Alert>
      )}
      {!loading && !error && resumes.length > 0 && (
        <ResumeList resumes={resumes} />
      )}
    </Container>
  );
};

export default HomePage;
