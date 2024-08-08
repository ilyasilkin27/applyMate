import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuthorizationUrl } from '../../../backend/src/auth';

const Login = () => {
    const handleLogin = () => {
        const authorizationUrl = getAuthorizationUrl();
        window.location.href = authorizationUrl;
    };

    return (
        <div className="container text-center mt-5">
            <h1>Авторизация</h1>
            <button className="btn btn-primary mt-3" onClick={handleLogin}>
                Войти через hh.ru
            </button>
        </div>
    );
};

export default Login;
