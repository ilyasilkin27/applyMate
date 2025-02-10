import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

const CoverLetter = ({ value, onChange }) => (
  <div className="mt-4 p-3 bg-light rounded-3 shadow-sm">
    <h4 className="mb-3 text-primary">Сопроводительное письмо</h4>
    <FloatingLabel 
      controlId="coverLetter"
      label={value ? "" : "Введите текст письма..."}
      className="mb-3"
    >
      <Form.Control
        as="textarea"
        style={{ height: '150px', resize: 'none' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary"
      />
    </FloatingLabel>
  </div>
);

export default CoverLetter;
