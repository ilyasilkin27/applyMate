import { useState, useEffect } from 'react';
import VacancyList from '../components/VacancyList';
import useFetchVacancies, { Vacancy } from '../api/fetchVacancies';
import { css } from '../../styled-system/css';

interface RecommendedVacanciesProps {
  selectedResumeId: string | null;
  onApply: (vacancyIds: string[]) => Promise<void>;
  onApplyAll: (vacancyIds: string[]) => void;
  customAlert?: string;
}

const RecommendedVacancies = ({
  selectedResumeId,
  onApply,
  onApplyAll,
  customAlert,
}: RecommendedVacanciesProps) => {
  const { vacancies, loading, error } = useFetchVacancies(selectedResumeId, '');
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);

  useEffect(() => {
    setFilteredVacancies(vacancies.filter((vacancy) => !vacancy.has_test));
  }, [vacancies]);

  return (
    <div className={css({
      paddingY: '4',
      maxWidth: '1200px',
      marginX: 'auto',
      width: '100%'
    })}>
      <div className={css({
        border: '0',
        boxShadow: 'lg',
        borderRadius: '3',
        backgroundColor: 'white',
        padding: '4'
      })}>
        <h2 className={css({
          marginBottom: '4',
          fontSize: '2',
          fontWeight: 'bold',
          color: 'primary'
        })}>
          Рекомендованные вакансии
        </h2>

        <button
          onClick={() => onApplyAll(filteredVacancies.map((v) => v.id))}
          className={css({
            width: '100%',
            marginBottom: '4',
            fontWeight: 'bold',
            paddingY: '2',
            paddingX: '4',
            boxShadow: 'sm',
            backgroundColor: 'primary',
            color: 'white',
            border: 'none',
            borderRadius: '3',
            cursor: 'pointer',
            fontSize: '1',
            '&:hover': {
              opacity: '0.9'
            }
          })}
        >
          Откликнуться на все вакансии
        </button>

        {customAlert && (
          <div className={css({
            marginTop: '3',
            padding: '3',
            borderRadius: '3',
            boxShadow: 'sm',
            border: '1px solid',
            borderColor: 'yellow.200',
            backgroundColor: 'yellow.50',
            color: 'yellow.800'
          })}>
            {customAlert}
          </div>
        )}

        {loading && (
          <div className={css({
            textAlign: 'center',
            paddingY: '4'
          })}>
            <div className={css({
              display: 'inline-block',
              width: '2rem',
              height: '2rem',
              border: '0.25rem solid',
              borderColor: 'primary',
              borderRightColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            })} />
          </div>
        )}

        {error && (
          <div className={css({
            marginTop: '3',
            padding: '3',
            borderRadius: '3',
            boxShadow: 'sm',
            border: '1px solid',
            borderColor: 'red.200',
            backgroundColor: 'red.50',
            color: 'red.800'
          })}>
            {error}
          </div>
        )}

        {!loading && !error && filteredVacancies.length === 0 && (
          <div className={css({
            marginTop: '3',
            padding: '3',
            borderRadius: '3',
            boxShadow: 'sm',
            border: '1px solid',
            borderColor: 'blue.200',
            backgroundColor: 'blue.50',
            color: 'blue.800'
          })}>
            Подходящие вакансии не найдены
          </div>
        )}

        {!loading && !error && filteredVacancies.length > 0 && (
          <VacancyList
            vacancies={filteredVacancies}
            onApply={(id) => onApply([id])}
          />
        )}
      </div>
    </div>
  );
};

export default RecommendedVacancies; 