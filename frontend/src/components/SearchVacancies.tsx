import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Search } from 'lucide-react'
import VacancyList from './VacancyList'
import useFetchVacancies from '../api/fetchVacancies'
import { applyAllVacancies } from '../utils/handleApply'

interface SearchVacanciesProps {
  selectedResumeId: string | null
  searchKeyword: string
  setSearchKeyword: (value: string) => void
  onApply: (vacancyId: string) => void
  coverLetter: string
}

const SearchVacancies: React.FC<SearchVacanciesProps> = ({
  selectedResumeId,
  searchKeyword,
  setSearchKeyword,
  onApply,
}) => {
  const [isApplying, setIsApplying] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const { vacancies, loading, error } = useFetchVacancies(
    selectedResumeId,
    searchKeyword
  )

  const hasSearchResults = !!searchKeyword && vacancies.length > 0
  const showEmptyState =
    searchKeyword && !loading && !error && vacancies.length === 0

  const handleApplyAll = async () => {
    if (!selectedResumeId || vacancies.length === 0) return

    setIsApplying(true)
    setApplyError(null)
    try {
      const vacancyIds = vacancies.map((v) => v.id)
      await applyAllVacancies(selectedResumeId, vacancyIds, '', setApplyError)
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="py-4 h-full flex flex-col">
      <div className="space-y-4 flex-1">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Поиск вакансий
        </h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Введите ключевое слово"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {(error || applyError) && (
          <Alert variant="destructive" className="rounded-lg">
            <AlertDescription>{error || applyError}</AlertDescription>
          </Alert>
        )}

        {hasSearchResults && (
          <>
            <Button
              onClick={handleApplyAll}
              disabled={isApplying}
              className="w-full py-2 font-bold"
            >
              {isApplying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                'Откликнуться на все вакансии'
              )}
            </Button>
            <div className="flex-1 min-h-[300px]">
              <VacancyList vacancies={vacancies} onApply={onApply} />
            </div>
          </>
        )}

        {showEmptyState && (
          <Alert variant="default" className="rounded-lg">
            <AlertDescription>
              По вашему запросу ничего не найдено
            </AlertDescription>
          </Alert>
        )}

        {!searchKeyword && (
          <Alert variant="default" className="rounded-lg">
            <AlertDescription>
              Начните вводить ключевое слово для поиска вакансий
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default SearchVacancies
