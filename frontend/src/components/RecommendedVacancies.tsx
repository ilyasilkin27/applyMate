import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
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
    <div className="py-4">
      <Card className="border-0 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Рекомендованные вакансии
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Button
            onClick={() => onApplyAll(filteredVacancies.map((v) => v.id))}
            className="w-full mb-4 font-bold py-2"
          >
            Откликнуться на все вакансии
          </Button>

          {customAlert && (
            <Alert variant="destructive" className="mt-3 rounded-lg">
              <AlertDescription>{customAlert}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-3 rounded-lg">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && filteredVacancies.length === 0 && (
            <Alert variant="default" className="mt-3 rounded-lg">
              <AlertDescription>
                Подходящие вакансии не найдены
              </AlertDescription>
            </Alert>
          )}

          {!loading && !error && filteredVacancies.length > 0 && (
            <VacancyList
              vacancies={filteredVacancies}
              onApply={(id: string) => onApply([id])}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RecommendedVacancies
