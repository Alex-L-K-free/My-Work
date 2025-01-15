// frontend/src/homepage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
// import { Link } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Загружаем товары из JSON файла
  useEffect(() => {
    fetch('/products/products.json') // Путь к файлу JSON
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Ошибка загрузки товаров:', error));
  }, []);

  const addToCart = (product) => {
    // Логика добавления товара в корзину
    console.log('Добавлен в корзину:', product);
    // Здесь можно добавить код для работы с корзиной, если она уже есть
  };

  return (
    <>
      {/* <Header isAuthenticated={false} /> */}
      <main>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Добро пожаловать в наш книжный магазин
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Найдите свою следующую любимую книгу!
          </Typography>

          {/* Карточки товаров */}
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="140"
                    image={product.image}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                    <Typography variant="h6" color="primary">{`₽${product.price}`}</Typography>
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
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;









// //frontend/src/homepage.js
// import React from 'react';
// import { Box, Typography, Grid } from '@mui/material';
// // import { Box, Typography, Button, Grid } from '@mui/material';
// // import { Link } from 'react-router-dom';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
//
// const HomePage = () => {
//   return (
//     <>
//       {/*<Header isAuthenticated={false} />*/}
//       <main>
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Typography variant="h4" gutterBottom>
//             Добро пожаловать в наш книжный магазин
//           </Typography>
//           <Typography variant="subtitle1" gutterBottom>
//             Найдите свою следующую любимую книгу!
//           </Typography>
//           <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
//             {/*<Grid item>*/}
//             {/*  <Button variant="contained" color="primary" component={Link} to="/cart">*/}
//             {/*    Корзина*/}
//             {/*  </Button>*/}
//             {/*</Grid>*/}
//             {/*<Grid item>*/}
//             {/*  <Button variant="contained" color="secondary" component={Link} to="/register">*/}
//             {/*    Регистрация*/}
//             {/*  </Button>*/}
//             {/*</Grid>*/}
//             {/*<Grid item>*/}
//             {/*  <Button variant="outlined" color="primary" component={Link} to="/login">*/}
//             {/*    Вход*/}
//             {/*  </Button>*/}
//             {/*</Grid>*/}
//           </Grid>
//         </Box>
//       </main>
//       {/*<Footer />*/}
//     </>
//   );
// };
//
// export default HomePage;




