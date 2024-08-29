import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

const ResumeList = ({ resumes, onSelect }) => {
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const handleSelect = (id) => {
    setSelectedResumeId(id);
    onSelect(id);
  };

  return (
    <ListGroup>
      {resumes.map((resume) => (
        <ListGroup.Item
          key={resume.id}
          onClick={() => handleSelect(resume.id)}
          style={{
            cursor: "pointer",
            backgroundColor: selectedResumeId === resume.id ? "#0d6efd" : "",
          }}
        >
          <h5
            style={{
              color: selectedResumeId === resume.id ? "white" : "",
            }}
          >
            {resume.title}
          </h5>
          <p
            style={{
              color: selectedResumeId === resume.id ? "white" : "",
            }}
          >
            {resume.first_name} {resume.middle_name} {resume.last_name}
          </p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ResumeList;
