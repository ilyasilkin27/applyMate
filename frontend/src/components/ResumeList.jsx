import React from "react";
import { ListGroup } from "react-bootstrap";

const ResumeList = ({ resumes }) => {
  return (
    <ListGroup>
      {resumes.map((resume) => (
        <ListGroup.Item key={resume.id}>
          <h5>{resume.title}</h5>
          <p>
            {resume.first_name} {resume.middle_name} {resume.last_name}
          </p>
          <a
            href={resume.alternate_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ResumeList;
