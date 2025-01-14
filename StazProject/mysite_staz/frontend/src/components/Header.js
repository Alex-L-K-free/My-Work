// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">BookStore</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Главная</Link>
          <Link to="/cart" className="hover:underline">Корзина</Link>
          <Link to="/orders" className="hover:underline">Заказы</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
