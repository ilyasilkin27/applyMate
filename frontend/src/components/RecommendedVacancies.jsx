import React, { useState, useEffect } from 'react';
import { Alert, Spinner, Button } from 'react-bootstrap';
import VacancyList from './VacancyList';
import useFetchVacancies from '../api/fetchVacancies';

const RecommendedVacancies = ({
  selectedResumeId,
  onApply,
  onApplyAll,
  customAlert,
}) => {
  const { vacancies, loading, error } = useFetchVacancies(selectedResumeId);
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  useEffect(() => {
    setFilteredVacancies(vacancies.filter((vacancy) => !vacancy.has_test));
  }, [vacancies]);

  return (
    <>
      <h3>Recommended Vacancies</h3>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => onApplyAll(filteredVacancies.map((v) => v.id))}
      >
        Apply to All Vacancies
      </Button>
      {customAlert && <Alert variant="warning">{customAlert}</Alert>}
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && filteredVacancies.length === 0 && (
        <Alert variant="info">No suitable vacancies found.</Alert>
      )}
      {!loading && !error && filteredVacancies.length > 0 && (
        <>
          <VacancyList
            vacancies={filteredVacancies}
            onApply={(id) => onApply([id])}
          />
        </>
      )}
    </>
  );
};

export default RecommendedVacancies;
