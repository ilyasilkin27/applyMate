import React, { useState } from 'react'
import {
  Form,
  Spinner,
  Alert,
  Button,
  Card,
  InputGroup,
  Container,
} from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
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
    <Container className="py-4">
      <Card className="border-0 shadow-lg rounded-3">
        <Card.Body className="p-4">
          <Card.Title className="mb-4 fs-2 fw-bold text-primary">
            Поиск вакансий
          </Card.Title>

          <InputGroup className="mb-4 shadow-sm">
            <InputGroup.Text className="bg-white border-end-0">
              <Search className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Введите ключевое слово"
              value={searchKeyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchKeyword(e.target.value)
              }
              className="border-start-0 py-2"
              style={{ height: '46px' }}
            />
          </InputGroup>

          {loading && (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </Spinner>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mt-3 rounded-3">
              {error}
            </Alert>
          )}
          {applyError && (
            <Alert variant="warning" className="mt-3 rounded-3">
              {applyError}
            </Alert>
          )}

          {hasSearchResults && (
            <div className="mt-4">
              <Button
                variant="primary"
                onClick={handleApplyAll}
                disabled={isApplying || vacancies.length === 0}
                size="lg"
                className="w-100 mb-4 py-3 fw-bold shadow-sm"
              >
                {isApplying ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Отправка...</span>
                  </>
                ) : (
                  'Отправить на все'
                )}
              </Button>
              <VacancyList vacancies={vacancies} onApply={onApply} />
            </div>
          )}

          {searchKeyword && !loading && !error && vacancies.length === 0 && (
            <Alert variant="info" className="mt-3 rounded-3">
              По вашему запросу ничего не найдено.
            </Alert>
          )}

          {!searchKeyword && (
            <Alert variant="light" className="mt-3 rounded-3 border">
              Начните вводить ключевое слово для поиска вакансий.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SearchVacancies
