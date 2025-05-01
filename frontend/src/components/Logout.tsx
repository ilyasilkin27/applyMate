import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { clearSessionStorage } from '../utils/storageUtils'
import { BoxArrowRight } from 'react-bootstrap-icons'

const Logout: React.FC = () => {
  const handleLogout = (): void => {
    clearSessionStorage()
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/logout'
  }

  return (
    <Card className="border-0 shadow-sm rounded-3 p-2 bg-light">
      <Button
        variant="outline-danger"
        onClick={handleLogout}
        className="d-flex align-items-center gap-2 fw-medium"
      >
        <BoxArrowRight size={18} />
        <span>Выйти</span>
      </Button>
    </Card>
  )
}

export default Logout
