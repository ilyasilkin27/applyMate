import React from "react";
import { Container } from "react-bootstrap";
import ButtonComponent from "./ButtonComponent";

const Login = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <div className="text-center">
        <h1>ApplyMate</h1>
        <ButtonComponent label="Login" onClick={handleLogin} className="mt-3" />
      </div>
    </Container>
  );
};

export default Login;
