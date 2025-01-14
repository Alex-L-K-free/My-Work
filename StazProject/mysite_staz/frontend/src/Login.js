// frontend/src/login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      const { access } = response.data;
      setToken(access);
      localStorage.setItem('access_token', access);

      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Неверные данные. Попробуйте снова.');
      setUsername('');
      setPassword('');
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

