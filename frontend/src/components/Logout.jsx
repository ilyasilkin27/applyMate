import React from "react";
import { Button } from "react-bootstrap";
import { clearSessionStorage } from '../utils/storageUtils';

const Logout = () => {
  const handleLogout = () => {
    clearSessionStorage();
    window.location.href = "https://applymate-auth-service.onrender.com/auth/logout";
  };

  return (
    <div className="d-flex justify-content-center ms-5 align-items-center">
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
