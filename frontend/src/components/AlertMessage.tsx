import { css } from '../../styled-system/css';

interface AlertMessageProps {
  message: string;
  variant?: 'info' | 'danger' | 'warning' | 'success';
  dismissible?: boolean;
  onClose?: () => void;
}

const AlertMessage = ({ message, variant = 'info', dismissible = false, onClose }: AlertMessageProps) => {
  if (!message) return null;

  const variantStyles = {
    info: {
      bg: 'blue.50',
      border: 'blue.200',
      text: 'blue.800'
    },
    danger: {
      bg: 'red.50',
      border: 'red.200',
      text: 'red.800'
    },
    warning: {
      bg: 'yellow.50',
      border: 'yellow.200',
      text: 'yellow.800'
    },
    success: {
      bg: 'green.50',
      border: 'green.200',
      text: 'green.800'
    }
  };

  return (
    <div className={css({
      marginTop: '3',
      padding: '3',
      borderRadius: '3',
      boxShadow: 'sm',
      border: '1px solid',
      borderColor: variantStyles[variant].border,
      backgroundColor: variantStyles[variant].bg,
      color: variantStyles[variant].text,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    })}>
      <span className={css({ fontWeight: 'medium' })}>{message}</span>
      {dismissible && (
        <button
          onClick={onClose}
          className={css({
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '1',
            color: variantStyles[variant].text,
            '&:hover': {
              opacity: '0.8'
            }
          })}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AlertMessage; 