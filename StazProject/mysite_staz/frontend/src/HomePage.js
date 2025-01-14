//frontend/src/homepage.js
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <>
      <Header isAuthenticated={false} />
      <main>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Добро пожаловать в наш книжный магазин
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Найдите свою следующую любимую книгу!
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Button variant="contained" color="primary" component={Link} to="/cart">
                Корзина
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" component={Link} to="/register">
                Регистрация
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" component={Link} to="/login">
                Вход
              </Button>
            </Grid>
          </Grid>
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;




