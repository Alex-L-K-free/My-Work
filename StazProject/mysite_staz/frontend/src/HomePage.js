//frontend/src/homepage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products/')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в наш книжный магазин
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Найдите свою следующую любимую книгу!
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item>
          <Button variant="contained" color="primary" href="/cart">
            Корзина
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" href="/register">
            Регистрация
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" href="/login">
            Вход
          </Button>
        </Grid>
      </Grid>
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">Цена: {product.price} ₽</p>
            <button className="button">Добавить в корзину</button>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default HomePage;




