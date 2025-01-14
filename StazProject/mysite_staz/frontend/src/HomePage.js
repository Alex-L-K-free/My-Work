//frontend/src/homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
      <div>
          <h1>Добро пожаловать в наш книжный магазин</h1>
          <p>Найдите свою следующую любимую книгу!</p>

          <div>
              <Link to="/cart">Корзина</Link>
              <Link to="/register">Регистрация</Link>
              <Link to="/login">Вход</Link>
          </div>

          <div>
              <h2>Наши книги</h2>
              <ul>
                  {/* Здесь можно добавить список популярных товаров или категории */}
                  <li>
                      <h3>Товар 1</h3>
                      <p>Краткое описание товара 1</p>
                      <Link to="/products/1">Посмотреть детали</Link>
                  </li>
                  <li>
                      <h3>Товар 2</h3>
                      <p>Краткое описание товара 2</p>
                      <Link to="/products/2">Посмотреть детали</Link>
                  </li>
              </ul>
          </div>

          <div>
              <h2>Корзина</h2>
              <Link to="/cart">Посмотреть корзину</Link>
          </div>

          <div>
              <h2>Заказы</h2>
              <Link to="/orders">Посмотреть заказы</Link>
          </div>
      </div>
  );
};

export default HomePage;

