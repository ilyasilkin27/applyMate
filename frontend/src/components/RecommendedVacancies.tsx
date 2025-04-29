import React, { useState, useEffect } from 'react'
import VacancyList from './VacancyList'
import useFetchVacancies, { Vacancy } from '../api/fetchVacancies'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AlertMessage from './AlertMessage'
import { Loader2 } from 'lucide-react'

interface RecommendedVacanciesProps {
  selectedResumeId: string
  onApply: (ids: string[]) => void
  onApplyAll: (ids: string[]) => void
  customAlert?: string
}

const RecommendedVacancies: React.FC<RecommendedVacanciesProps> = ({
  selectedResumeId,
  onApply,
  onApplyAll,
  customAlert,
}) => {
  const { vacancies, loading, error } = useFetchVacancies(selectedResumeId)
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([])

  useEffect(() => {
    setFilteredVacancies(vacancies.filter((vacancy) => !vacancy.has_test))
  }, [vacancies])

  return (
    <div className="py-6 flex justify-center">
      <Card className="w-full max-w-3xl bg-white shadow-xl rounded-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-hhtext">
            Рекомендованные вакансии
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            onClick={() => onApplyAll(filteredVacancies.map((v) => v.id))}
            className="w-full py-3 text-lg font-semibold bg-hhred hover:bg-hhred-dark text-white shadow transition-colors"
            size="lg"
            disabled={filteredVacancies.length === 0 || loading}
          >
            Откликнуться на все вакансии
          </Button>

          {customAlert && (
            <AlertMessage
              message={customAlert}
              variant="warning"
              className="mt-2"
            />
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-hhred" size={32} />
              <span className="sr-only">Загрузка...</span>
            </div>
          )}

          {error && (
            <AlertMessage message={error} variant="danger" className="mt-2" />
          )}

          {!loading && !error && filteredVacancies.length === 0 && (
            <AlertMessage
              message="Подходящие вакансии не найдены"
              variant="info"
              className="mt-2"
            />
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
