import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const VacancyList = ({ vacancies, onApply }) => {
  return (
    <ListGroup>
      {vacancies.map((vacancy) => (
        <ListGroup.Item
          key={vacancy.id}
          style={{ display: "flex", flexDirection: "column" }}
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
            onClick={() => onApply(vacancy.id)}
            style={{ width: "200px" }}
          >
            Apply
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default VacancyList;
