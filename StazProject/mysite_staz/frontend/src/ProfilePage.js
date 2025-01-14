// mysite_staz/frontend/src/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { fetchCart } from './axiosConfig';

const ProfilePage = ({ token }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart(setCart, setError, setLoading, token);
  }, [token]);

  return (
    <div>
      <h1>Личный кабинет</h1>
      {loading ? (
        <p>Загрузка корзины...</p>
      ) : error ? (
        <p>Ошибка: {error}</p>
      ) : (
        <ul>
          {cart.length > 0 ? (
            cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} руб.
              </li>
            ))
          ) : (
            <li>Корзина пуста</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
