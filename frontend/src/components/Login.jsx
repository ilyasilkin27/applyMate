import React from "react";
import { Container, Button } from "react-bootstrap";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/login";
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <div className="text-center">
        <h1>ApplyMate</h1>
        <Button variant="primary" onClick={handleLogin}>
          Log in
        </Button>
      </div>
    </Container>
  );
};

export default Login;
