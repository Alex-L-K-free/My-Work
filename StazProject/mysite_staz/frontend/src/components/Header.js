// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Header = ({ isAuthenticated }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Главная
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Корзина
        </Button>
        {isAuthenticated ? (
          <Button color="inherit" component={Link} to="/profile">
            Мой кабинет
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/register">
              Регистрация
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Вход
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
