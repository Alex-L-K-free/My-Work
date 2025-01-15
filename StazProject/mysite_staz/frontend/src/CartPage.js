// frontend/src/CartPage.js - страница для отображения корзины
import React from 'react';
import Cart from './Cart';

const CartPage = () => {
  const userToken = localStorage.getItem('access_token'); // Замените на реальный токен

  return (
    <div>
      <h1>Страница корзины</h1>
      <Cart token={userToken} />
    </div>
  );
};

export default CartPage;
