import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Сбрасываем ошибку перед новым запросом

        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });

            setToken(response.data.access);
            localStorage.setItem('access_token', response.data.access);

            setUsername('');
            setPassword('');
        } catch (err) {
            setError('Неверные данные. Попробуйте снова.');
        }
    };

    return (
        <div className="login-container">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Логин:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;




// import React, { useState } from 'react';
// import axios from 'axios';
//
// const Login = ({ setToken }) => {
//     // Состояния для хранения данных формы
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//
//     // Обработчик отправки формы
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');  // Сбрасываем ошибку перед новым запросом
//
//         try {
//             const response = await axios.post('http://localhost:8000/api/token/', {
//                 username: username,
//                 password: password,
//             });
//
//             // Если авторизация успешна, сохраняем токен в state
//             setToken(response.data.access);
//             localStorage.setItem('access_token', response.data.access);  // Сохраняем токен в localStorage для последующего использования
//
//             // Очищаем форму
//             setUsername('');
//             setPassword('');
//         } catch (err) {
//             setError('Неверные данные. Попробуйте снова.');
//         }
//     };
//
//     return (
//         <div className="login-container">
//             <h2>Авторизация</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="username">Логин:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Пароль:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {error && <div className="error">{error}</div>}
//                 <button type="submit">Войти</button>
//             </form>
//         </div>
//     );
// };
//
// export default Login;
