import type { Vacancy } from '../api/fetchVacancies';
import { css } from '../../styled-system/css';

interface Props {
  vacancies: Vacancy[];
  onApply: (id: string) => void;
}

export default function VacancyList({ vacancies, onApply }: Props) {
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
      {vacancies.map((vacancy) => (
        <div
          key={vacancy.id}
          className={css({
            padding: '4',
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: '3',
            backgroundColor: 'white'
          })}
        >
          <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', marginBottom: '2' })}>
            {vacancy.name}
          </h3>
          <button
            onClick={() => onApply(vacancy.id)}
            className={css({
              padding: '2',
              backgroundColor: 'primary',
              color: 'white',
              border: 'none',
              borderRadius: '3',
              cursor: 'pointer',
              '&:hover': {
                opacity: '0.9'
              }
            })}
          >
            Откликнуться
          </button>
        </div>
      ))}
    </div>
  );
} 