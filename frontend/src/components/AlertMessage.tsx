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
  info: <Info className="h-5 w-5 text-hhred shrink-0" aria-hidden="true" />,
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

const bgMap = {
  info: 'bg-hhgray',
  danger: 'bg-hhred/10',
  warning: 'bg-yellow-50',
  success: 'bg-green-50',
}

const borderMap = {
  info: 'border-hhred',
  danger: 'border-hhred',
  warning: 'border-yellow-400',
  success: 'border-green-400',
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  variant = 'info',
  dismissible = false,
  onClose,
  className,
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
      className={`mt-3 rounded-lg shadow flex items-start gap-3 ${
        bgMap[variant]
      } border-l-4 ${borderMap[variant]} ${className ?? ''}`}
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
