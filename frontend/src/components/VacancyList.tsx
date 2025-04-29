import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, CheckCircle } from 'lucide-react'

export interface Vacancy {
  id: string
  name: string
  employer?: { name?: string }
  salary?: { from?: number; to?: number; currency?: string }
  published_at: string
  alternate_url: string
}

interface VacancyListProps {
  vacancies: Vacancy[]
  onApply: (id: string) => void
}

const VacancyList: React.FC<VacancyListProps> = ({ vacancies, onApply }) => {
  const [appliedVacancies, setAppliedVacancies] = useState<string[]>([])

  const handleApply = (vacancyId: string) => {
    onApply(vacancyId)
    setAppliedVacancies((prev) => [...prev, vacancyId])
  }

  return (
    <div className="space-y-4 max-h-[495px] overflow-y-auto p-2">
      {vacancies.map((vacancy) => {
        const isApplied = appliedVacancies.includes(vacancy.id)
        return (
          <Card
            key={vacancy.id}
            className={`transition-opacity ${
              isApplied ? 'opacity-60' : ''
            } border-0 shadow`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-hhtext">
                {vacancy.name}
              </CardTitle>
              <CardDescription className="text-hhsecondary">
                {vacancy.employer?.name || 'Неизвестная компания'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge
                  className="bg-hhbg text-hhtext font-medium"
                  variant="outline"
                >
                  {vacancy.salary && vacancy.salary.from && vacancy.salary.to
                    ? `${vacancy.salary.from} - ${vacancy.salary.to} ${vacancy.salary.currency}`
                    : 'Зарплата не указана'}
                </Badge>
                <span className="text-xs text-hhsecondary ml-auto">
                  Опубликовано:{' '}
                  {new Date(vacancy.published_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <a
                    href={vacancy.alternate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Посмотреть
                  </a>
                </Button>
                <Button
                  variant={isApplied ? 'outline' : 'default'}
                  size="sm"
                  className={`flex items-center gap-1 ${
                    isApplied
                      ? 'border-hhgreen text-hhgreen'
                      : 'bg-hhred hover:bg-hhred-dark text-white'
                  }`}
                  onClick={() => handleApply(vacancy.id)}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle size={16} className="mr-1" />
                      Отправлено
                    </>
                  ) : (
                    'Откликнуться'
                  )}
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
