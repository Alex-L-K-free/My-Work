// frontend/src/homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Добро пожаловать в интернет-магазин</h1>
      <p>Ознакомьтесь с нашими товарами и наслаждайтесь покупками!</p>

      <div>
        <h2>Рекомендуемые товары</h2>
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
        <h2>Ваша корзина</h2>
        <Link to="/cart">Посмотреть корзину</Link>
      </div>

      <div>
        <h2>Ваши заказы</h2>
        <Link to="/orders">Посмотреть заказы</Link>
      </div>
    </div>
  );
};

export default HomePage;

