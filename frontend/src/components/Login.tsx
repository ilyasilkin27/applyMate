import { css } from '../../styled-system/css';

const LockIcon = () => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'https://applymate-auth-service.onrender.com/auth/login';
  };

  return (
    <main className={css({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'gray.50',
      padding: '4'
    })}
    role="main"
    aria-labelledby="login-title"
    >
      <div className={css({
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 'xl',
        boxShadow: 'lg',
        padding: '4',
        position: 'relative',
        _focus: {
          outline: '2px solid',
          outlineColor: 'primary',
          outlineOffset: '2px'
        }
      })}
      role="region"
      aria-label="Login form"
      >
        <div className={css({
          textAlign: 'center',
          marginBottom: '4'
        })}>
          <div className={css({
            color: 'primary',
            marginBottom: '3',
            display: 'flex',
            justifyContent: 'center'
          })}>
            <LockIcon />
          </div>
          <h1 
            id="login-title"
            className={css({
              fontSize: '2xl',
              fontWeight: 'bold',
              marginBottom: '3',
              color: 'gray.900'
            })}
          >
            ApplyMate
          </h1>
          <span className={css({
            srOnly: true
          })}>
            Страница входа в систему
          </span>
        </div>

        <button
          onClick={handleLogin}
          className={css({
            width: '100%',
            marginBottom: '3',
            backgroundColor: 'primary',
            color: 'white',
            padding: '2',
            fontSize: 'lg',
            fontWeight: 'bold',
            borderRadius: 'md',
            boxShadow: 'sm',
            transition: 'all 0.2s',
            position: 'relative',
            _hover: {
              backgroundColor: 'primary.hover',
              transform: 'translateY(-1px)'
            },
            _active: {
              transform: 'translateY(0)'
            },
            _focus: {
              outline: '2px solid',
              outlineColor: 'primary',
              outlineOffset: '2px'
            },
            _disabled: {
              opacity: 0.6,
              cursor: 'not-allowed'
            }
          })}
          aria-label="Войти через HeadHunter"
        >
          Войти через HeadHunter
        </button>

        <div className={css({
          textAlign: 'center',
          marginTop: '4'
        })}>
          <small className={css({
            color: 'gray.600',
            fontSize: 'sm',
            display: 'block'
          })}
          role="status"
          aria-live="polite"
          >
            Сервис в разработке
          </small>
        </div>
      </div>
    </main>
  );
};

export default Login; 