import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface AlertMessageProps {
  message: string
  variant?: 'default' | 'destructive'
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  variant = 'default',
}) => {
  if (!message) return null

  return (
    <Alert
      variant={variant}
      className={cn(
        'mt-3 rounded-lg shadow-sm',
        variant === 'destructive' ? 'bg-destructive/10' : 'bg-background'
      )}
    >
      <AlertDescription className="flex items-center gap-2">
        {variant === 'destructive' ? (
          <span className="text-destructive">⚠️</span>
        ) : (
          <span className="text-primary">ℹ️</span>
        )}
        <span className="font-medium">{message}</span>
      </AlertDescription>
    </Alert>
  )
}

export default AlertMessage
