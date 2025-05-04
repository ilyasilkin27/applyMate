import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
    <div className="max-h-[495px] overflow-y-auto p-3 space-y-3">
      {vacancies.map((vacancy) => {
        const isApplied = appliedVacancies.includes(vacancy.id)

        return (
          <Card
            key={vacancy.id}
            className={`shadow-sm ${isApplied ? 'opacity-50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="mb-2">{vacancy.name}</CardTitle>
                  <CardDescription className="mb-2">
                    {vacancy.employer?.name || 'Неизвестная компания'}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
                  {vacancy.salary
                    ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}`
                    : 'Зарплата не указана'}
                </Badge>
              </div>

              <p className="text-muted-foreground text-sm mb-3">
                Опубликовано:
                {new Date(vacancy.published_at).toLocaleDateString()}
              </p>

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={vacancy.alternate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Посмотреть вакансию
                  </a>
                </Button>

                <Button
                  variant={isApplied ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => handleApply(vacancy.id)}
                  disabled={isApplied}
                >
                  {isApplied ? 'Отправлено' : 'Откликнуться'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default VacancyList
