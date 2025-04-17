import { useState } from 'react';
import { css } from '../../styled-system/css';

interface Resume {
  id: string;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface ResumeListProps {
  resumes: Resume[];
  onSelect: (id: string) => void;
}

const ResumeList = ({ resumes, onSelect }: ResumeListProps) => {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedResumeId(id);
    onSelect(id);
  };

  return (
    <div className={css({
      border: '0',
      boxShadow: 'sm',
      borderRadius: '3',
      backgroundColor: 'white',
      padding: '3'
    })}>
      <div className={css({ position: 'relative' })}>
        <label className={css({
          position: 'absolute',
          top: '-1.5rem',
          left: '0.5rem',
          backgroundColor: 'white',
          paddingX: '1',
          fontSize: '0.875rem',
          color: 'gray.600'
        })}>
          Выберите резюме
        </label>
        <select
          onChange={handleSelect}
          value={selectedResumeId || ''}
          className={css({
            width: '100%',
            padding: '3',
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: '3',
            backgroundColor: 'transparent',
            outline: 'none',
            fontSize: '1',
            cursor: 'pointer',
            '&:focus': {
              borderColor: 'primary',
              boxShadow: 'none'
            }
          })}
        >
          <option value="" className={css({ color: 'gray.400' })}>Выберите резюме</option>
          {resumes.map((resume) => (
            <option 
              key={resume.id} 
              value={resume.id}
              className={css({ color: 'gray.900' })}
            >
              {resume.title} - {resume.first_name} {resume.middle_name} {resume.last_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ResumeList; 