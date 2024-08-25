import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ButtonComponent from "./ButtonComponent";

const HomePage = () => {
  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <h1>Welcome to ApplyMate</h1>
          <ButtonComponent label="Click Me" onClick={handleButtonClick} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
