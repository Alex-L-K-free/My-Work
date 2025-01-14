// frontend/src/Cart.js
import React, { useState, useEffect } from 'react';
import { fetchCart } from './axiosConfig';

const Cart = ({ token }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const response = await fetchCart(token);
        setCart(response.data);
      } catch (err) {
        setError('Ошибка при загрузке корзины');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [token]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Ваша корзина</h2>
      <ul>
        {cart.length === 0 ? (
          <li>Ваша корзина пуста</li>
        ) : (
          cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} руб.
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;


