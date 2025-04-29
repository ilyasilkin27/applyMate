import React, { useState } from 'react'
import VacancyList from './VacancyList'
import useFetchVacancies from '../api/fetchVacancies'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AlertMessage from './AlertMessage'
import { Loader2, Search as SearchIcon } from 'lucide-react'
import { applyAllVacancies } from '../utils/handleApply'

interface SearchVacanciesProps {
  selectedResumeId: string
  onApply: (id: string) => void
}

const SearchVacancies: React.FC<SearchVacanciesProps> = ({
  selectedResumeId,
  onApply,
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [isApplying, setIsApplying] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const { vacancies, loading, error } = useFetchVacancies(
    selectedResumeId,
    searchKeyword
  )

  const hasSearchResults = searchKeyword && vacancies.length > 0

  const handleApplyAll = async () => {
    if (!selectedResumeId || vacancies.length === 0) return

    setIsApplying(true)
    setApplyError(null)

    const vacancyIds = vacancies.map((v) => v.id)
    await applyAllVacancies(selectedResumeId, vacancyIds, '', setApplyError)

    setIsApplying(false)
    if (!applyError) {
      alert('Успешно отправлено на все вакансии!')
    }
  }

  return (
    <div className="py-6 flex justify-center">
      <Card className="w-full max-w-3xl bg-white shadow-xl rounded-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-hhtext">
            Поиск вакансий
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-hhsecondary">
              <SearchIcon size={20} />
            </span>
            <Input
              type="text"
              placeholder="Введите ключевое слово"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 border-hhborder focus:border-hhred focus:ring-hhred/30 text-hhtext placeholder:text-hhsecondary"
            />
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-hhred" size={32} />
              <span className="sr-only">Загрузка...</span>
            </div>
          )}

          {error && (
            <AlertMessage message={error} variant="danger" className="mt-2" />
          )}
          {applyError && (
            <AlertMessage
              message={applyError}
              variant="warning"
              className="mt-2"
            />
          )}

          {hasSearchResults && (
            <div className="mt-4 flex flex-col gap-4">
              <Button
                onClick={handleApplyAll}
                disabled={isApplying || vacancies.length === 0}
                className="w-full py-3 text-lg font-semibold bg-hhred hover:bg-hhred-dark text-white shadow transition-colors"
                size="lg"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
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
            <AlertMessage
              message="По вашему запросу ничего не найдено."
              variant="info"
              className="mt-2"
            />
          )}

          {!searchKeyword && (
            <AlertMessage
              message="Начните вводить ключевое слово для поиска вакансий."
              variant="info"
              className="mt-2"
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchVacancies
