import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import React from 'react'

export interface AlertMessageProps {
  message: string
  variant?: 'info' | 'danger' | 'warning' | 'success'
  dismissible?: boolean
  onClose?: () => void
  className?: string
}

const iconMap = {
  info: <Info className="h-5 w-5 text-blue-500 shrink-0" aria-hidden="true" />,
  danger: (
    <XCircle className="h-5 w-5 text-hhred shrink-0" aria-hidden="true" />
  ),
  warning: (
    <AlertTriangle
      className="h-5 w-5 text-yellow-500 shrink-0"
      aria-hidden="true"
    />
  ),
  success: (
    <CheckCircle
      className="h-5 w-5 text-green-600 shrink-0"
      aria-hidden="true"
    />
  ),
}

const titleMap = {
  info: 'Информация',
  danger: 'Ошибка',
  warning: 'Внимание',
  success: 'Успех',
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  variant = 'info',
  dismissible = false,
  onClose,
  className
}) => {
  if (!message) return null
  const shadcnVariantMap = {
    info: 'default',
    success: 'default',
    warning: 'default',
    danger: 'destructive',
  } as const

  return (
    <Alert
      className={`mt-3 rounded-lg shadow border-0 flex items-start gap-3 bg-white ${
        className ?? ''
      }`}
      variant={shadcnVariantMap[variant]}
    >
      {iconMap[variant]}
      <div className="flex-1">
        <AlertTitle className="font-bold text-hhtext">
          {titleMap[variant]}
        </AlertTitle>
        <AlertDescription className="text-hhsecondary">
          {message}
        </AlertDescription>
      </div>
      {dismissible && (
        <button
          onClick={onClose}
          className="ml-2 text-hhsecondary hover:text-hhred transition-colors"
          aria-label="Закрыть"
        >
          ×
        </button>
      )}
    </Alert>
  )
}

export default AlertMessage
