import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
    <div className="py-4 h-full flex flex-col">
      <div className="space-y-4 flex-1">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Рекомендованные вакансии
        </h2>

        <Button
          onClick={() => onApplyAll(filteredVacancies.map((v) => v.id))}
          className="w-full py-2 font-bold"
        >
          Откликнуться на все вакансии
        </Button>

        {customAlert && (
          <Alert variant="destructive" className="rounded-lg">
            <AlertDescription>{customAlert}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="rounded-lg">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && filteredVacancies.length === 0 && (
          <Alert variant="default" className="rounded-lg">
            <AlertDescription>Подходящие вакансии не найдены</AlertDescription>
          </Alert>
        )}

        {!loading && !error && filteredVacancies.length > 0 && (
          <div className="flex-1 min-h-[300px]">
            <VacancyList
              vacancies={filteredVacancies}
              onApply={(id: string) => onApply([id])}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default RecommendedVacancies
