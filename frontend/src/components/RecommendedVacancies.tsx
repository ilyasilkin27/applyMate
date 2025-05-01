import React, { useState, useEffect } from 'react'
import { Alert, Spinner, Button, Card, Container } from 'react-bootstrap'
import VacancyList from './VacancyList'
import useFetchVacancies from '../api/fetchVacancies'
import type { Vacancy } from '../types/models'

interface RecommendedVacanciesProps {
  selectedResumeId: string | null
  coverLetter: string
  onApply: (vacancyIds: string[]) => void
  onApplyAll: (vacancyIds: string[]) => void
  customAlert?: string | null
}

const RecommendedVacancies: React.FC<RecommendedVacanciesProps> = ({
  selectedResumeId,
  onApply,
  onApplyAll,
  customAlert,
}) => {
  const { vacancies, loading, error } = useFetchVacancies(
    selectedResumeId,
    null
  )
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([])

  useEffect(() => {
    setFilteredVacancies(vacancies.filter((vacancy) => !vacancy.has_test))
  }, [vacancies])

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-lg rounded-3">
        <Card.Body className="p-4">
          <Card.Title className="mb-4 fs-2 fw-bold text-primary">
            Рекомендованные вакансии
          </Card.Title>

          <Button
            variant="primary"
            size="lg"
            className="w-100 mb-4 fw-bold py-2 shadow-sm"
            onClick={() => onApplyAll(filteredVacancies.map((v) => v.id))}
          >
            Откликнуться на все вакансии
          </Button>

          {customAlert && (
            <Alert variant="warning" className="mt-3 rounded-3">
              {customAlert}
            </Alert>
          )}

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

          {!loading && !error && filteredVacancies.length === 0 && (
            <Alert variant="info" className="mt-3 rounded-3">
              Подходящие вакансии не найдены
            </Alert>
          )}

          {!loading && !error && filteredVacancies.length > 0 && (
            <VacancyList
              vacancies={filteredVacancies}
              onApply={(id: string) => onApply([id])}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RecommendedVacancies
