import React from "react";
import { ListGroup } from "react-bootstrap";

const ResumeList = ({ resumes, onSelect }) => {
  return (
    <ListGroup>
      {resumes.map((resume) => (
        <ListGroup.Item
          key={resume.id}
          onClick={() => onSelect(resume.id)}
          style={{ cursor: "pointer" }}
        >
          <h5>{resume.title}</h5>
          <p>
            {resume.first_name} {resume.middle_name} {resume.last_name}
          </p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ResumeList;
