import React from "react";
import { ListGroup } from "react-bootstrap";

const VacancyList = ({ vacancies }) => {
  return (
    <ListGroup>
      {vacancies.map((vacancy) => (
        <ListGroup.Item key={vacancy.id}>
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
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default VacancyList;
