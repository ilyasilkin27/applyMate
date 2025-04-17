import { css } from '../../styled-system/css';

interface CoverLetterProps {
  value: string;
  onChange: (value: string) => void;
}

const CoverLetter = ({ value, onChange }: CoverLetterProps) => (
  <div className={css({
    marginTop: '4',
    padding: '3',
    backgroundColor: 'white',
    borderRadius: '3',
    boxShadow: 'sm'
  })}>
    <h4 className={css({
      marginBottom: '3',
      color: 'primary',
      fontSize: '1.25rem',
      fontWeight: 'bold'
    })}>Сопроводительное письмо</h4>
    <div className={css({ marginBottom: '3' })}>
      <textarea
        className={css({
          width: '100%',
          height: '150px',
          resize: 'none',
          padding: '3',
          borderRadius: '3',
          border: '1px solid',
          borderColor: 'primary',
          outline: 'none',
          fontSize: '1',
          '&:focus': {
            borderColor: 'primary',
            boxShadow: 'sm'
          }
        })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите текст письма..."
      />
    </div>
  </div>
);

export default CoverLetter; 