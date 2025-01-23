import React, { useState } from 'react';
import { Form, Spinner, Alert } from 'react-bootstrap';
import VacancyList from './VacancyList';
import useFetchVacancies from '../api/fetchVacancies';

const SearchVacancies = ({ selectedResumeId, onApply }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { vacancies, loading, error } = useFetchVacancies(
    selectedResumeId,
    searchKeyword
  );

  const hasSearchResults = searchKeyword && vacancies.length > 0;

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

      {hasSearchResults && (
        <VacancyList vacancies={vacancies} onApply={onApply} />
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
