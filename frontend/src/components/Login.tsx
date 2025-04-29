import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lock } from 'lucide-react'

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href =
      'https://applymate-auth-service.onrender.com/auth/login'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-hhbg">
      <Card className="w-full max-w-md shadow-xl rounded-xl border-0 bg-white">
        <CardContent className="p-8 flex flex-col items-center">
          <Lock size={48} className="text-hhred mb-4" />
          <h2 className="text-2xl font-bold mb-6 text-hhtext">ApplyMate</h2>
          <Button
            onClick={handleLogin}
            className="w-full py-3 text-lg font-semibold bg-hhred hover:bg-hhred-dark text-white shadow transition-colors"
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