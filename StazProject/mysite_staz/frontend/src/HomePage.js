import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Online Shop</h1>
      <p>Browse our products and enjoy shopping!</p>

      <div>
        <h2>Featured Products</h2>
        <ul>
          {/* Здесь можно добавить список популярных товаров или категории */}
          <li>
            <h3>Product 1</h3>
            <p>Short description of product 1</p>
            <Link to="/products/1">View Details</Link>
          </li>
          <li>
            <h3>Product 2</h3>
            <p>Short description of product 2</p>
            <Link to="/products/2">View Details</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2>Your Cart</h2>
        <Link to="/cart">View Cart</Link>
      </div>

      <div>
        <h2>Your Orders</h2>
        <Link to="/orders">View Orders</Link>
      </div>
    </div>
  );
};

export default HomePage;
