import ResumeList from './ResumeList';
import { css } from '../../styled-system/css';

interface Resume {
  id: string;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface ResumeSelectionProps {
  resumes: Resume[];
  loading: boolean;
  error: string | null;
  onSelect: (id: string) => void;
}

const ResumeSelection = ({ resumes, loading, error, onSelect }: ResumeSelectionProps) => {
  return (
    <div className={css({ paddingY: '4' })}>
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
          Выберите резюме
        </h2>

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

        {!loading && !error && resumes.length === 0 && (
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
            Резюме не найдены
          </div>
        )}

        {!loading && !error && resumes.length > 0 && (
          <ResumeList resumes={resumes} onSelect={onSelect} />
        )}
      </div>
    </div>
  );
};

export default ResumeSelection; 