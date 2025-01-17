// frontend/src/CartPage.js
import React from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';

const CartPage = ({ cart }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ваша корзина
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Корзина пуста</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <ListItem key={index}>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">{`₽${item.price}`}</Typography>
            </ListItem>
          ))}
        </List>
      )}
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Оформить заказ
      </Button>
    </Box>
  );
};

export default CartPage;


