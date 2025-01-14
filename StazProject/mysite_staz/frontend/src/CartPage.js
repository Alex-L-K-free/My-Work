// frontend/src/pages/CartPage.js - страница Корзина
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const CartPage = () => {
  return (
    <div>
      <Header isAuthenticated={false} /> {/* передайте isAuthenticated */}
      <main>
        <h1>Корзина</h1>
        <p>Здесь будут отображаться книги, добавленные в вашу корзину.</p>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;