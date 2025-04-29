import React from 'react';
import { Form } from 'react-bootstrap';

const CoverLetter = ({ value, onChange }) => (
  <div className="mt-4 p-3 bg-light rounded-3 shadow-sm">
    <h4 className="mb-3 text-primary">Сопроводительное письмо</h4>
    <Form.Group controlId="coverLetter" className="mb-3">
      <Form.Control
        as="textarea"
        style={{ height: '150px', resize: 'none' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary"
        placeholder="Введите текст письма..."
      />
    </Form.Group>
  </div>
);

export default CoverLetter;
