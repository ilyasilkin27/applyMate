import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            fetch('/api/exchange-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: authorizationCode }),
            }).then(response => response.json())
              .then(data => {
                  if (data.success) {
                      setAuthorized(true);
                  }
              });
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={authorized ? <Home /> : <Login />} />
            </Routes>
        </Router>
    );
};

export default App;
