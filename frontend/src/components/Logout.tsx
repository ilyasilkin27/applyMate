import React from 'react'
import { Button } from '@/components/ui/button'
import { clearSessionStorage } from '../utils/storageUtils'
import { ExitIcon } from '@radix-ui/react-icons'

const Logout: React.FC = () => {
  const handleLogout = (): void => {
    clearSessionStorage()
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/logout'
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={handleLogout}
        className="flex items-center gap-2 font-medium text-destructive hover:text-destructive"
      >
        <ExitIcon className="h-4 w-4" />
        <span>Выйти</span>
      </Button>
    </div>
  )
}

export default Logout
