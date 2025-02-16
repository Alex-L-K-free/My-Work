// frontend/src/homepage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products/products.json')
    fetch('http://localhost:8000/api/products/')
    fetch('http://127.0.0.1:8000/api/products/')
        // fetch('http://localhost:8000/media/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Ошибка загрузки товаров:', error));
  }, []);

  const addToCart = (product) => {
    console.log('Добавлен в корзину:', product);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          textAlign: 'center',
          px: 2,
          py: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Добро пожаловать в наш книжный магазин
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Найдите свою следующую любимую книгу!
        </Typography>


    <Grid container spacing={2} justifyContent="center" sx={{ mt: 1 }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardMedia
              component="img"
              image={product.image || '/placeholder.png'} // изображение-заглушка, если `product.image` отсутствует
              alt={product.name}
              sx={{
                height: 180,
                width: 'auto',
                maxWidth: '100%',
                backgroundColor: '#f5f5f5',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                {`Цена: ${product.price} BYN`}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(product)}
                sx={{ mt: 2 }}
              >
                Добавить в корзину
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
     </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          textAlign: 'center',
          py: 1, // Уменьшаем отступы
        }}
      >
        <Typography variant="body1">© 2025 Книжный магазин.</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
