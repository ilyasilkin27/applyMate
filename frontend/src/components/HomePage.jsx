import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Button, Form } from "react-bootstrap";
import { useFetchResumes, useFetchVacancies } from "../hooks/dataHooks";
import Logout from "./Logout";
import ResumeList from "./ResumeList";
import VacancyList from "./VacancyList";
import "../styles/homePage.css";

const HomePage = () => {
  const {
    resumes,
    loading: resumesLoading,
    error: resumesError,
  } = useFetchResumes();
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    vacancies,
    loading: vacanciesLoading,
    error: vacanciesError,
  } = useFetchVacancies(selectedResumeId);

  const [coverLetter, setCoverLetter] = useState("");
  const [customAlert, setCustomAlert] = useState(null);

  useEffect(() => {
    const savedCoverLetter = localStorage.getItem("coverLetter");
    if (savedCoverLetter) {
      setCoverLetter(savedCoverLetter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("coverLetter", coverLetter);
  }, [coverLetter]);

  const handleApply = async (vacancyIds) => {
    if (!selectedResumeId) return;
    try {
      const response = await fetch(
        `https://apply-mate-backend.vercel.app/resumes/${selectedResumeId}/apply_all_vacancies`,
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

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.description === "Daily negotiations limit is exceeded") {
          setCustomAlert(
            "Daily limit of 200 negotiations has already been used."
          );
        } else {
          setCustomAlert(
            `Error: ${errorData.description || "An unknown error occurred"}`
          );
        }
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error("Error applying to vacancies:", err);
      if (err.message.includes("Failed to fetch")) {
        setCustomAlert(
          "Daily limit of 200 negotiations has already been used."
        );
      } else {
        setCustomAlert("An error occurred while applying to vacancies.");
      }
    }
  };

  const filteredVacancies = vacancies.filter((vacancy) => !vacancy.has_test);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <h1>ApplyMate</h1>
        <Logout />
      </div>
      {resumesLoading && (
        <div className="spinnerOverlay">
          <Spinner animation="border" />
        </div>
      )}
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
          {customAlert && <Alert variant="warning">{customAlert}</Alert>}{" "}
          <Form.Group controlId="coverLetter" className="mt-3">
            <Form.Label>
              {" "}
              <h2>Cover Letter</h2>
            </Form.Label>
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
            className="mt-3 mb-3"
            onClick={() => {
              setIsDisabled(true);
              handleApply(filteredVacancies.map((v) => v.id));
            }}
            disabled={isDisabled}
          >
            Apply to All Vacancies
          </Button>
          {vacanciesLoading && (
            <div className="spinnerOverlay">
              <Spinner animation="border" />
            </div>
          )}
          {vacanciesError && <Alert variant="danger">{vacanciesError}</Alert>}
          {!vacanciesLoading &&
            !vacanciesError &&
            filteredVacancies.length === 0 && (
              <Alert variant="info">No suitable vacancies found.</Alert>
            )}
          {!vacanciesLoading &&
            !vacanciesError &&
            filteredVacancies.length > 0 && (
              <VacancyList
                vacancies={filteredVacancies}
                onApply={(id) => handleApply([id])}
              />
            )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
