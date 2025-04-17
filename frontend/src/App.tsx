import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import './styles/global.css';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />} 
        />
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
