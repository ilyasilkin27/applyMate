import React from "react";
import { Button } from "react-bootstrap";

const Logout = () => {
  const handleLogout = () => {
    window.location.href = "https://apply-mate-backend.vercel.app/logout";
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
