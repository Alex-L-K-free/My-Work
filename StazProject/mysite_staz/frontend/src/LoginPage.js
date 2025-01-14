// frontend/src/pages/LoginPage.js - страница Вход
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <Header isAuthenticated={false} /> {/* передайте isAuthenticated */}
      <main>
        <h1>Вход</h1>
        <p>Введите свои данные, чтобы войти в аккаунт.</p>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;