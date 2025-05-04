import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Login: React.FC = () => {
  const handleLogin = (): void => {
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/login'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <Card className="w-full max-w-md border-0 bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="text-center p-8 pb-6">
          <CardTitle className="text-3xl font-bold text-neutral-900">
            ApplyMate
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <Button
            onClick={handleLogin}
            className="w-full text-lg font-medium"
            size="lg"
          >
            Войти через HeadHunter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
