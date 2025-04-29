import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ message, variant = 'info', dismissible = false, onClose }) => {
  if (!message) return null;

  return (
    <Alert 
      variant={variant} 
      className="mt-3 rounded-3 shadow-sm border-0"
      style={{
        backgroundColor: `var(--bs-${variant}-bg-subtle)`,
        color: `var(--bs-${variant}-text-emphasis)`,
        borderLeft: `4px solid var(--bs-${variant})`
      }}
      dismissible={dismissible}
      onClose={onClose}
    >
      <div className="d-flex align-items-center">
        <i className={`bi bi-${variant === 'danger' ? 'exclamation-octagon' : 
          variant === 'warning' ? 'exclamation-triangle' : 
          variant === 'success' ? 'check-circle' : 'info-circle'} 
          me-2`}></i>
        <span className="fw-medium">{message}</span>
      </div>
    </Alert>
  );
};

export default AlertMessage;
