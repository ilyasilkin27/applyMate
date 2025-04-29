import React from 'react'
import { Alert, Spinner, Card, Container } from 'react-bootstrap'
import ResumeList from './ResumeList'

const ResumeSelection = ({ resumes, loading, error, onSelect }) => {
  return (
    <Container className="py-4">
      <Card className="border-0 shadow-lg rounded-3">
        <Card.Body className="p-4">
          <Card.Title className="mb-4 fs-2 fw-bold text-primary">
            Выберите резюме
          </Card.Title>

          {loading && (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </Spinner>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mt-3 rounded-3">
              {error}
            </Alert>
          )}

          {!loading && !error && resumes.length === 0 && hasLoadedOnce && (
            <Alert variant="info" className="mt-3 rounded-3">
              Резюме не найдены
            </Alert>
          )}

          {!loading && !error && resumes.length > 0 && (
            <ResumeList resumes={resumes} onSelect={onSelect} />
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ResumeSelection
