// mysite_staz/frontend/src/dashboard.js
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



// import React, { useState, useEffect } from 'react';
// import axiosInstance from './axiosConfig';
//
// const Dashboard = ({ token, setToken }) => {
//     const [userData, setUserData] = useState(null); // Данные пользователя
//     const [loading, setLoading] = useState(true); // Индикатор загрузки
//     const [error, setError] = useState(''); // Сообщение об ошибке
//
//     // Запрос данных о пользователе при загрузке компонента
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get('/user/', {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Использование токена для авторизации
//                     },
//                 });
//                 setUserData(response.data); // Установка данных пользователя
//             } catch (err) {
//                 setError('Ошибка при загрузке данных пользователя'); // Установка сообщения об ошибке
//             } finally {
//                 setLoading(false); // Окончание загрузки
//             }
//         };
//
//         if (token) {
//             fetchData();
//         } else {
//             setError('Токен не предоставлен'); // Ошибка, если токен отсутствует
//             setLoading(false);
//         }
//     }, [token]); // Зависимость от токена
//
//     // Функция для выхода из системы
//     const handleLogout = () => {
//         setToken(''); // Сброс токена в состоянии
//         localStorage.removeItem('access_token'); // Удаление токена из локального хранилища
//     };
//
//     // Отображение состояния загрузки
//     if (loading) {
//         return <div>Загрузка...</div>;
//     }
//
//     // Деструктуризация данных пользователя
//     const { username, email } = userData || {};
//
//     // Рендеринг компонента
//     return (
//         <div className="dashboard">
//             {error ? (
//                 <div>{error}</div> // Отображение ошибки
//             ) : (
//                 <div>
//                     <h2>Добро пожаловать, {username || 'Пользователь'}!</h2>
//                     <p>Email: {email || 'Нет данных'}</p>
//                     <button onClick={handleLogout}>Выйти</button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Dashboard;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import axiosInstance from './axiosConfig';
//
// const Dashboard = ({ token, setToken }) => {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//
//     // Запрос данных о пользователе при загрузке компонента
//      useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get('/user/');
//                 setUserData(response.data);
//             } catch (err) {
//                 setError('Ошибка при загрузке данных пользователя');
//             }
//         };
//
//         fetchData();
//     }, []);
// };
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         if (token) {
//     //             try {
//     //                 const response = await axios.get('http://localhost:8000/api/user/', {
//     //                     headers: {
//     //                         Authorization: `Bearer ${token}`,
//     //                     },
//     //                 });
//     //                 setUserData(response.data);
//     //             } catch (err) {
//     //                 setError('Ошибка при загрузке данных пользователя');
//     //             } finally {
//     //                 setLoading(false);
//     //             }
//     //         }
//     //     };
//     //
//     //     fetchData();
//     // }, [token]);
//
//     // Функция для выхода из системы
//     const handleLogout = () => {
//         setToken('');
//         localStorage.removeItem('access_token');
//     };
//
//     if (loading) {
//         return <div>Загрузка...</div>;
//     }
//
//     const { username, email } = userData || {};
//
//     return (
//         <div className="dashboard">
//             {error ? (
//                 <div>{error}</div>
//             ) : (
//                 <div>
//                     <h2>Добро пожаловать, {username || 'Пользователь'}!</h2>
//                     <p>Email: {email || 'Нет данных'}</p>
//                     <button onClick={handleLogout}>Выйти</button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Dashboard;
