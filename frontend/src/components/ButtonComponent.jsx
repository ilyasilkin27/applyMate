import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonComponent = ({ label, onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      {label}
    </Button>
  );
};

export default ButtonComponent;
