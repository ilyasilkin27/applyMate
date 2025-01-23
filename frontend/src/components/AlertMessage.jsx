import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ message, variant = 'info' }) => {
  if (!message) return null;

  return (
    <Alert variant={variant} className="mt-3">
      {message}
    </Alert>
  );
};

export default AlertMessage;
