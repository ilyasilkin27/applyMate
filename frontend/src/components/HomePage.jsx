import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import ResumeList from "./ResumeList";
import VacancyList from "./VacancyList";

const HomePage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [vacanciesLoading, setVacanciesLoading] = useState(false);
  const [vacanciesError, setVacanciesError] = useState(null);

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

  useEffect(() => {
    if (selectedResumeId) {
      const fetchVacancies = async () => {
        setVacanciesLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3001/resumes/${selectedResumeId}/similar_vacancies`,
            {
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setVacancies(data.items || []);
        } catch (err) {
          setVacanciesError(err.message);
        } finally {
          setVacanciesLoading(false);
        }
      };

      fetchVacancies();
    }
  }, [selectedResumeId]);

  const handleResumeSelect = (resumeId) => {
    setSelectedResumeId(resumeId);
  };

  return (
    <Container className="mt-4">
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && resumes.length === 0 && (
        <Alert variant="info">No resumes found.</Alert>
      )}
      {!loading && !error && resumes.length > 0 && (
        <ResumeList resumes={resumes} onSelect={handleResumeSelect} />
      )}
      {selectedResumeId && (
        <>
          <h3>Recommended Vacancies</h3>
          {vacanciesLoading && <Spinner animation="border" />}
          {vacanciesError && <Alert variant="danger">{vacanciesError}</Alert>}
          {!vacanciesLoading && !vacanciesError && vacancies.length === 0 && (
            <Alert variant="info">No similar vacancies found.</Alert>
          )}
          {!vacanciesLoading && !vacanciesError && vacancies.length > 0 && (
            <VacancyList vacancies={vacancies} />
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
