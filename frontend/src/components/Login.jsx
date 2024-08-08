import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = () => {
    const handleLogin = async () => {
        try {
            const response = await axios.get('https://applymatebackend-lem56lxuf-ilyas-projects-973327cb.vercel.app/api/authorize');
            const authorizationUrl = response.data.url;
            window.location.href = authorizationUrl;
        } catch (error) {
            console.error('Ошибка при получении URL авторизации:', error);
        }
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
