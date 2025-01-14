// frontend/src/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { fetchCart } from './axiosConfig';

const AdminPanel = ({ token }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart(setCart, setError, setLoading, token);
  }, [token]);

  return (
    <div>
      <h1>Административная панель</h1>
      {loading ? (
        <p>Загрузка данных...</p>
      ) : error ? (
        <p>Ошибка: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Товар</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price} руб.</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
