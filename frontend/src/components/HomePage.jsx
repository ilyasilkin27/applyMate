import React, { useState } from "react";
import { Container, Spinner, Alert, Button, Form } from "react-bootstrap";
import { useFetchResumes, useFetchVacancies } from "../hooks/dataHooks";
import ResumeList from "./ResumeList";
import VacancyList from "./VacancyList";

const HomePage = () => {
  const {
    resumes,
    loading: resumesLoading,
    error: resumesError,
  } = useFetchResumes();
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const {
    vacancies,
    loading: vacanciesLoading,
    error: vacanciesError,
  } = useFetchVacancies(selectedResumeId);
  const [coverLetter, setCoverLetter] = useState("");

  const handleApply = async (vacancyIds) => {
    if (!selectedResumeId) return;
    try {
      const response = await fetch(
        `http://localhost:3001/resumes/${selectedResumeId}/apply_all_vacancies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vacancies: vacancyIds.map((id) => ({ id })),
            coverLetter,
          }),
          credentials: "include",
        }
      );
      const { message } = await response.json();
      alert(message);
    } catch (err) {
      console.error("Error applying to vacancies:", err);
    }
  };

  return (
    <Container className="mt-4">
      {resumesLoading && <Spinner animation="border" />}
      {resumesError && <Alert variant="danger">{resumesError}</Alert>}
      {!resumesLoading && !resumesError && resumes.length === 0 && (
        <Alert variant="info">No resumes found.</Alert>
      )}
      {!resumesLoading && !resumesError && resumes.length > 0 && (
        <ResumeList resumes={resumes} onSelect={setSelectedResumeId} />
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
            onClick={() => handleApply(vacancies.map((v) => v.id))}
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
              onApply={(id) => handleApply([id])}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
