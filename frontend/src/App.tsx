import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import Login from './components/Login'
import HomePage from './components/HomePage'
import { getFromSessionStorage } from './utils/storageUtils'
import './index.css'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const accessToken = getFromSessionStorage('access_token')
  return accessToken ? children : <Navigate to="/login" replace />
}

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
