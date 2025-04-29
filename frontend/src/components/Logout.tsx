import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LogOut } from 'lucide-react'
import { clearSessionStorage } from '../utils/storageUtils'

const Logout: React.FC = () => {
  const handleLogout = () => {
    clearSessionStorage()
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/logout'
  }

  return (
    <Card className="w-full max-w-xs bg-white shadow rounded-xl border-0">
      <CardContent className="p-4 flex items-center">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2 text-hhred border-hhred hover:bg-hhred hover:text-white transition-colors w-full font-medium"
        >
          <LogOut size={18} />
          <span>Выйти</span>
        </Button>
      </CardContent>
    </Card>
  )
}

export default Logout
