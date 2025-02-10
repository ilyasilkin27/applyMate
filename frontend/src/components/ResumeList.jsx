import React, { useState } from "react";
import { Form, Card, FloatingLabel } from "react-bootstrap";

const ResumeList = ({ resumes, onSelect }) => {
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedResumeId(id);
    onSelect(id);
  };

  return (
    <Card className="border-0 shadow-sm rounded-3">
      <Card.Body className="p-3">
        <FloatingLabel controlId="resumeSelect" label="Выберите резюме">
          <Form.Select 
            aria-label="Выберите резюме"
            onChange={handleSelect}
            value={selectedResumeId || ""}
            className="border-0 shadow-none"
            style={{ backgroundColor: 'transparent' }}
          >
            <option value="" className="text-muted">Выберите резюме</option>
            {resumes.map((resume) => (
              <option 
                key={resume.id} 
                value={resume.id}
                className="text-dark"
              >
                {resume.title} - {resume.first_name} {resume.middle_name} {resume.last_name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Card.Body>
    </Card>
  );
};

export default ResumeList;
