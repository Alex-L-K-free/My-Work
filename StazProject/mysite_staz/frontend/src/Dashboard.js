// mysite_staz/frontend/src/dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ token, setToken }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Запрос данных о пользователе при загрузке компонента
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/user/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data);
                } catch (err) {
                    setError('Ошибка при загрузке данных пользователя');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [token]);

    // Функция для выхода из системы
    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('access_token');
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    const { username, email } = userData || {};

    return (
        <div className="dashboard">
            {error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <h2>Добро пожаловать, {username || 'Пользователь'}!</h2>
                    <p>Email: {email || 'Нет данных'}</p>
                    <button onClick={handleLogout}>Выйти</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
