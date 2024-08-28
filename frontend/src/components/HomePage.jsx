import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert, Button, Form } from "react-bootstrap";
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
  const [coverLetter, setCoverLetter] = useState("");

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

  const handleApplyAllVacancies = async () => {
    if (selectedResumeId && vacancies.length > 0) {
      try {
        const response = await fetch(
          `http://localhost:3001/resumes/${selectedResumeId}/apply_all_vacancies`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              vacancies: vacancies.map((vacancy) => ({
                id: vacancy.id,
              })),
              coverLetter,
            }),
            credentials: "include",
          }
        );

        const data = await response.json();
        alert(data.message);
      } catch (err) {
        console.error("Error applying to all vacancies:", err);
      }
    }
  };

  const handleApplySingleVacancy = async (vacancyId) => {
    if (selectedResumeId) {
      try {
        const response = await fetch(
          `http://localhost:3001/resumes/${selectedResumeId}/apply_all_vacancies`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              vacancies: [{ id: vacancyId }],
              coverLetter,
            }),
            credentials: "include",
          }
        );

        const data = await response.json();
        alert(data.message);
      } catch (err) {
        console.error(`Error applying to vacancy ${vacancyId}:`, err);
      }
    }
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
          <Form.Group controlId="coverLetter" className="mt-3">
            <Form.Label>Cover Letter</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Enter your cover letter here..."
            />
          </Form.Group>
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleApplyAllVacancies}
          >
            Apply to All Vacancies
          </Button>
          {vacanciesLoading && <Spinner animation="border" />}
          {vacanciesError && <Alert variant="danger">{vacanciesError}</Alert>}
          {!vacanciesLoading && !vacanciesError && vacancies.length === 0 && (
            <Alert variant="info">No similar vacancies found.</Alert>
          )}
          {!vacanciesLoading && !vacanciesError && vacancies.length > 0 && (
            <VacancyList
              vacancies={vacancies}
              onApply={handleApplySingleVacancy}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
