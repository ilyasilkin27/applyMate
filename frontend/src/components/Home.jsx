import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="container mt-5">
            <h1>Список вакансий</h1>
            <ul className="list-group">
                {vacancies.map(vacancy => (
                    <li key={vacancy.id} className="list-group-item">
                        {vacancy.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
