// frontend/src/pages/RegisterPage.js - страница Регистрация
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div>
      <Header isAuthenticated={false} /> {/* передайте isAuthenticated */}
      <main>
        <h1>Регистрация</h1>
        <p>Создайте аккаунт, чтобы начать покупать книги.</p>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;