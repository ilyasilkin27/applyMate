import React, { useState } from 'react';
import { Form, Spinner, Alert, Button } from 'react-bootstrap';
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
      alert('Successfully applied to all vacancies!');
    }
  };

  return (
    <div>
      <h3>Search Vacancies</h3>
      <Form.Control
        type="text"
        placeholder="Enter keyword"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="mb-3"
      />

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {applyError && <Alert variant="warning">{applyError}</Alert>}

      {hasSearchResults && (
        <>
          <Button 
            variant="primary" 
            onClick={handleApplyAll}
            disabled={isApplying || vacancies.length === 0}
            className="mb-3"
          >
            {isApplying ? 'Applying...' : 'Apply to All'}
          </Button>
          <VacancyList vacancies={vacancies} onApply={onApply} />
        </>
      )}

      {searchKeyword && !loading && !error && vacancies.length === 0 && (
        <Alert variant="info">No vacancies found for your search.</Alert>
      )}

      {!searchKeyword && (
        <Alert variant="secondary">Start typing to search for vacancies.</Alert>
      )}
    </div>
  );
};

export default SearchVacancies;
