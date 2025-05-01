import React from 'react'
import { Container, Button, Card } from 'react-bootstrap'
import { LockFill } from 'react-bootstrap-icons'

const Login: React.FC = () => {
  const handleLogin = (): void => {
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/login'
  }

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Card
        className="border-0 shadow-lg rounded-4"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <LockFill size={48} className="text-primary mb-3" />
            <h2 className="fw-bold mb-3">ApplyMate</h2>
          </div>

          <Button
            variant="primary"
            onClick={handleLogin}
            size="lg"
            className="w-100 mb-3 fw-bold py-2 shadow-sm"
          >
            Войти через HeadHunter
          </Button>

          <div className="text-center mt-4">
            <small className="text-muted">
              Продолжая, вы соглашаетесь с нашими условиями использования
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
