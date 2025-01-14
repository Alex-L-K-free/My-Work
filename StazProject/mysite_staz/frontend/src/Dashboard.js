// frontend/src/dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ token, setToken }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Ошибка при загрузке данных пользователя.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('access_token');
  };

  if (loading) return <div>Загрузка...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h2>Добро пожаловать, {userData?.username || 'Пользователь'}!</h2>
      <p>Email: {userData?.email || 'Нет данных'}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Dashboard;

