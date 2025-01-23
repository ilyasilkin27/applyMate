import React from 'react';
import { Form } from 'react-bootstrap';

const CoverLetter = ({ value, onChange }) => (
  <Form.Group controlId="coverLetter" className="mt-3">
    <Form.Label>
      <h4>Cover Letter</h4>
    </Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your cover letter here..."
    />
  </Form.Group>
);

export default CoverLetter;
