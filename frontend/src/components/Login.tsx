import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const Login: React.FC = () => {
  const handleLogin = (): void => {
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/login'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Вход в ApplyMate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Войти через HeadHunter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
