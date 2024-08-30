import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

const VacancyList = ({ vacancies, onApply }) => {
  const [appliedVacancies, setAppliedVacancies] = useState([]);

  const handleApply = (vacancyId) => {
    onApply(vacancyId);

    setAppliedVacancies((prev) => [...prev, vacancyId]);
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
      <ListGroup>
        {vacancies.map((vacancy) => {
          const isApplied = appliedVacancies.includes(vacancy.id);

          return (
            <ListGroup.Item
              key={vacancy.id}
              style={{
                display: "flex",
                flexDirection: "column",
                opacity: isApplied ? 0.5 : 1,
                backgroundColor: isApplied ? "#f8f9fa" : "white",
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <div>
                <h5>{vacancy.name}</h5>
                <p>{vacancy.employer?.name || "Unknown Company"}</p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {vacancy.salary
                    ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}`
                    : "Not specified"}
                </p>
                <p>
                  <strong>Published at:</strong>{" "}
                  {new Date(vacancy.published_at).toLocaleDateString()}
                </p>
                <a
                  href={vacancy.alternate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Vacancy
                </a>
              </div>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => handleApply(vacancy.id)}
                style={{ width: "200px" }}
                disabled={isApplied}
              >
                {isApplied ? "Applied" : "Apply"}
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default VacancyList;
