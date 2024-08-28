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
              vacancies: vacancies.map((vacancy) => ({ id: vacancy.id })),
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
      {resumesLoading && <Spinner animation="border" />}
      {resumesError && <Alert variant="danger">{resumesError}</Alert>}
      {!resumesLoading && !resumesError && resumes.length === 0 && (
        <Alert variant="info">No resumes found.</Alert>
      )}
      {!resumesLoading && !resumesError && resumes.length > 0 && (
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
