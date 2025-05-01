import React, { useState } from 'react'
import { Card, Button, Badge, Stack } from 'react-bootstrap'
import type { Vacancy } from '../types/models'

interface VacancyListProps {
  vacancies: Vacancy[]
  onApply: (vacancyId: string) => void
}

const VacancyList: React.FC<VacancyListProps> = ({ vacancies, onApply }) => {
  const [appliedVacancies, setAppliedVacancies] = useState<string[]>([])

  const handleApply = (vacancyId: string) => {
    onApply(vacancyId)
    setAppliedVacancies((prev) => [...prev, vacancyId])
  }

  return (
    <div style={{ maxHeight: '495px', overflowY: 'auto' }} className="p-3">
      <Stack gap={3}>
        {vacancies.map((vacancy) => {
          const isApplied = appliedVacancies.includes(vacancy.id)

          return (
            <Card
              key={vacancy.id}
              className={`shadow-sm ${isApplied ? 'opacity-50' : ''}`}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="mb-2">{vacancy.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {vacancy.employer?.name || 'Неизвестная компания'}
                    </Card.Subtitle>
                  </div>
                  <Badge bg="light" text="dark" className="fs-6">
                    {vacancy.salary
                      ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}`
                      : 'Зарплата не указана'}
                  </Badge>
                </div>

                <Card.Text className="text-muted small mb-3">
                  Опубликовано:{' '}
                  {new Date(vacancy.published_at).toLocaleDateString()}
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    href={vacancy.alternate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Посмотреть вакансию
                  </Button>

                  <Button
                    variant={isApplied ? 'outline-success' : 'primary'}
                    size="sm"
                    onClick={() => handleApply(vacancy.id)}
                    disabled={isApplied}
                  >
                    {isApplied ? 'Отправлено' : 'Откликнуться'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )
        })}
      </Stack>
    </div>
  )
}

export default VacancyList
