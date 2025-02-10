import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ResumeList = ({ resumes, onSelect }) => {
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedResumeId(id);
    onSelect(id);
  };

  return (
    <Form.Select 
      aria-label="Выберите резюме" 
      onChange={handleSelect}
      value={selectedResumeId || ""}
      className="mb-3"
    >
      <option value="">Выберите резюме</option>
      {resumes.map((resume) => (
        <option 
          key={resume.id} 
          value={resume.id}
        >
          {resume.title} - {resume.first_name} {resume.middle_name} {resume.last_name}
        </option>
      ))}
    </Form.Select>
  );
};

export default ResumeList;
