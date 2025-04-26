import { clearSessionStorage } from '../utils/storageUtils';
import { css } from '../../styled-system/css';

const Logout = () => {
  const handleLogout = () => {
    clearSessionStorage();
    window.location.href = 'https://applymate-auth-service.onrender.com/auth/logout';
  };

  return (
    <div className={css({
      border: '0',
      boxShadow: 'sm',
      borderRadius: '3',
      padding: '2',
      backgroundColor: 'white'
    })}>
      <button 
        onClick={handleLogout}
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          fontWeight: 'medium',
          padding: '2',
          border: '1px solid',
          borderColor: 'red.200',
          color: 'red.600',
          backgroundColor: 'transparent',
          borderRadius: '3',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'red.50'
          }
        })}
      >
        <span>Выйти</span>
      </button>
    </div>
  );
};

export default Logout; 