import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import Login from './components/Login'
import HomePage from './components/HomePage'
import { getFromSessionStorage } from './utils/storageUtils'
import './index.css'

const AuthWrapper: React.FC = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token =
      params.get('access_token') || getFromSessionStorage('access_token')
    setIsAuthenticated(!!token)

    if (params.get('access_token')) {
      window.history.replaceState({}, '', '/home')
    }
  }, [location])

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }

  return isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
}

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<AuthWrapper />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
