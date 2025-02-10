import React, { useState } from 'react';
import { Form, Spinner, Alert, Button, Card, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import VacancyList from './VacancyList';
import useFetchVacancies from '../api/fetchVacancies';
import { applyAllVacancies } from '../utils/handleApply';

const SearchVacancies = ({ selectedResumeId, onApply }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState(null);
  const { vacancies, loading, error } = useFetchVacancies(
    selectedResumeId,
    searchKeyword
  );

  const hasSearchResults = searchKeyword && vacancies.length > 0;

  const handleApplyAll = async () => {
    if (!selectedResumeId || vacancies.length === 0) return;
    
    setIsApplying(true);
    setApplyError(null);
    
    const vacancyIds = vacancies.map(v => v.id);
    await applyAllVacancies(selectedResumeId, vacancyIds, '', setApplyError);
    
    setIsApplying(false);
    if (!applyError) {
      alert('Успешно отправлено на все вакансии!');
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Поиск вакансий</Card.Title>
        
        <InputGroup className="mb-4">
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Введите ключевое слово"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border-start-0"
          />
        </InputGroup>

        {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {applyError && <Alert variant="warning" className="mt-3">{applyError}</Alert>}

        {hasSearchResults && (
          <>
            <div className="d-grid gap-3">
              <Button 
                variant="primary" 
                onClick={handleApplyAll}
                disabled={isApplying || vacancies.length === 0}
                size="lg"
              >
                {isApplying ? 'Отправка...' : 'Отправить на все'}
              </Button>
              <VacancyList vacancies={vacancies} onApply={onApply} />
            </div>
          </>
        )}

        {searchKeyword && !loading && !error && vacancies.length === 0 && (
          <Alert variant="info" className="mt-3">По вашему запросу ничего не найдено.</Alert>
        )}

        {!searchKeyword && (
          <Alert variant="secondary" className="mt-3">Начните вводить ключевое слово для поиска вакансий.</Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default SearchVacancies;
