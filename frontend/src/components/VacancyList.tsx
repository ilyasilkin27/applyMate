import React, { useState } from 'react'
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
    <div className="space-y-3">
      {vacancies.map((vacancy) => {
        const isApplied = appliedVacancies.includes(vacancy.id)

        return (
          <div
            key={vacancy.id}
            className={`p-4 rounded-lg border shadow-sm ${
              isApplied ? 'opacity-70' : ''
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{vacancy.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {vacancy.employer?.name || 'Неизвестная компания'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Опубликовано:{' '}
                  {new Date(vacancy.published_at).toLocaleDateString()}
                </p>
              </div>

              <Badge
                variant="outline"
                className="self-start sm:self-center text-sm"
              >
                {vacancy.salary
                  ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}`
                  : 'Зарплата не указана'}
              </Badge>
            </div>

            <div className="mt-4 flex flex-col xs:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-sm py-2 px-4 sm:py-1 sm:px-3"
                asChild
              >
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
                className="text-sm py-2 px-4 sm:py-1 sm:px-3"
                onClick={() => handleApply(vacancy.id)}
                disabled={isApplied}
              >
                {isApplied ? 'Отправлено' : 'Откликнуться'}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VacancyList
