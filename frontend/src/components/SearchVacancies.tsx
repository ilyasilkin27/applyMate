import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Search } from 'lucide-react'
import VacancyList from './VacancyList'
import useFetchVacancies from '../api/fetchVacancies'
import { applyAllVacancies } from '../utils/handleApply'
import type { Vacancy } from '../types/models'

interface SearchVacanciesProps {
  selectedResumeId: string | null
  searchKeyword: string
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>
  onApply: (vacancyId: string) => void
  coverLetter: string
}

const SearchVacancies: React.FC<SearchVacanciesProps> = ({
  selectedResumeId,
  onApply,
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [isApplying, setIsApplying] = useState<boolean>(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const { vacancies, loading, error } = useFetchVacancies(
    selectedResumeId,
    searchKeyword
  )

  const hasSearchResults = !!searchKeyword && vacancies.length > 0

  const handleApplyAll = async () => {
    if (!selectedResumeId || vacancies.length === 0) return

    setIsApplying(true)
    setApplyError(null)

    const vacancyIds = vacancies.map((v: Vacancy) => v.id)
    await applyAllVacancies(selectedResumeId, vacancyIds, '', setApplyError)

    setIsApplying(false)
    if (!applyError) {
      alert('Успешно отправлено на все вакансии!')
    }
  }

  return (
    <div className="py-4">
      <Card className="border-0 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Поиск вакансий
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Введите ключевое слово"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-10 py-2 h-12"
            />
          </div>

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
          {applyError && (
            <Alert variant="destructive" className="mt-3 rounded-lg">
              <AlertDescription>{applyError}</AlertDescription>
            </Alert>
          )}

          {hasSearchResults && (
            <div className="mt-4">
              <Button
                onClick={handleApplyAll}
                disabled={isApplying || vacancies.length === 0}
                className="w-full mb-4 py-3 font-bold"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Отправить на все'
                )}
              </Button>
              <VacancyList vacancies={vacancies} onApply={onApply} />
            </div>
          )}

          {searchKeyword && !loading && !error && vacancies.length === 0 && (
            <Alert variant="default" className="mt-3 rounded-lg">
              <AlertDescription>
                По вашему запросу ничего не найдено.
              </AlertDescription>
            </Alert>
          )}

          {!searchKeyword && (
            <Alert variant="default" className="mt-3 rounded-lg">
              <AlertDescription>
                Начните вводить ключевое слово для поиска вакансий.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchVacancies
