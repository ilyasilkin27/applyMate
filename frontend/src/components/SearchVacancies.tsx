import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Search, MapPin } from 'lucide-react'
import VacancyList from './VacancyList'
import useFetchVacancies from '../api/fetchVacancies'
import { applyAllVacancies } from '../utils/handleApply'
import { cityToIdMapping, isValidCity } from '../utils/cityMapping'

interface SearchVacanciesProps {
  selectedResumeId: string | null
  searchKeyword: string
  setSearchKeyword: (value: string) => void
  searchCity: string
  setSearchCity: (value: string) => void
  onApply: (vacancyId: string) => void
  coverLetter: string
}

const popularCities = Object.keys(cityToIdMapping)

const SearchVacancies: React.FC<SearchVacanciesProps> = ({
  selectedResumeId,
  searchKeyword,
  setSearchKeyword,
  searchCity,
  setSearchCity,
  onApply,
  coverLetter,
}) => {
  const [isApplying, setIsApplying] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const [showCitySuggestions, setShowCitySuggestions] = useState(false)
  const cityInputRef = useRef<HTMLInputElement>(null)
  const { vacancies, loading, error } = useFetchVacancies(
    selectedResumeId,
    searchKeyword,
    searchCity
  )

  const hasSearchResults = (!!searchKeyword || !!searchCity) && vacancies.length > 0
  const showEmptyState =
    (searchKeyword || searchCity) && !loading && !error && vacancies.length === 0
  const showCityError = searchCity && !isValidCity(searchCity) && !showCitySuggestions

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowCitySuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleApplyAll = async () => {
    if (!selectedResumeId || vacancies.length === 0) return

    setIsApplying(true)
    setApplyError(null)
    try {
      const vacancyIds = vacancies.map((v) => v.id)
      await applyAllVacancies(selectedResumeId, vacancyIds, coverLetter, setApplyError)
    } finally {
      setIsApplying(false)
    }
  }

  const handleCitySelect = (city: string) => {
    setSearchCity(city)
    setShowCitySuggestions(false)
  }

  const filteredCities = popularCities.filter(city =>
    city.toLowerCase().includes(searchCity.toLowerCase())
  )

  return (
    <div className="py-4 h-full flex flex-col">
      <div className="space-y-4 flex-1">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Поиск вакансий
        </h2>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Введите ключевое слово"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative" ref={cityInputRef}>
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Введите город (например: Москва, Санкт-Петербург)"
              value={searchCity}
              onChange={(e) => {
                setSearchCity(e.target.value)
                setShowCitySuggestions(true)
              }}
              onFocus={() => setShowCitySuggestions(true)}
              className={`pl-10 ${showCityError ? 'border-red-500' : ''}`}
            />
            {showCitySuggestions && searchCity && filteredCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {showCityError && (
          <Alert variant="destructive" className="rounded-lg">
            <AlertDescription>
              Город "{searchCity}" не найден. Выберите город из списка или введите корректное название.
            </AlertDescription>
          </Alert>
        )}

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
            <div className="h-[60vh] overflow-y-auto">
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

        {!searchKeyword && !searchCity && (
          <Alert variant="default" className="rounded-lg">
            <AlertDescription>
              Начните вводить ключевое слово или город для поиска вакансий
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default SearchVacancies
