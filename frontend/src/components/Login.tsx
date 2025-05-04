import React from 'react'
import { Button } from '@/components/ui/button'

const Login: React.FC = () => {
  const handleLogin = (): void => {
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/login'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 p-6 sm:p-8 rounded-lg border shadow-sm bg-card">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Вход в ApplyMate
          </h1>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full py-3 sm:py-2 text-sm sm:text-base font-medium bg-primary hover:bg-primary/90"
          size="lg"
        >
          Войти через HeadHunter
        </Button>
      </div>
    </div>
  )
}

export default Login
