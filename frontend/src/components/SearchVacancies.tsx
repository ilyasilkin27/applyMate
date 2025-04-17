import { Search } from 'react-bootstrap-icons';
import { css } from '../../styled-system/css';

interface SearchVacanciesProps {
  selectedResumeId: string;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  onApply: (vacancyId: string) => void;
  coverLetter: string;
}

const SearchVacancies = ({ searchKeyword, setSearchKeyword }: SearchVacanciesProps) => {
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
        backgroundColor: 'white'
      })}>
        <div className={css({ padding: '4' })}>
          <h2 className={css({
            marginBottom: '4',
            fontSize: '2',
            fontWeight: 'bold',
            color: 'primary'
          })}>
            Поиск вакансий
          </h2>

          <div className={css({ position: 'relative' })}>
            <input
              type="text"
              placeholder="Введите ключевые слова"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className={css({
                width: '100%',
                padding: '3',
                paddingLeft: '10',
                borderRadius: '3',
                border: '1px solid',
                borderColor: 'gray.200',
                outline: 'none',
                fontSize: '1',
                '&:focus': {
                  borderColor: 'primary',
                  boxShadow: 'none'
                }
              })}
            />
            <Search className={css({
              position: 'absolute',
              left: '3',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'gray.400',
              width: '5',
              height: '5'
            })} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVacancies; 