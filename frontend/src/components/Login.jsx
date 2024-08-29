import React from "react";
import { Container, Button } from "react-bootstrap";
import '../styles/login.css';

const Login = () => {
  const handleLogin = () => {
    window.location.href = "https://apply-mate-backend.vercel.app/login";
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <div className="auth-container text-center">
        <h3 className="mb-4">
          <strong>ApplyMate</strong>
        </h3>
        <Button variant="primary" onClick={handleLogin} className="w-100 mb-2">
          Log in
        </Button>
      </div>
    </Container>
  );
};

export default Login;
