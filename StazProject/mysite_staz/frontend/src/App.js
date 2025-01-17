// frontend/src/App.js
import './style.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import CartPage from './CartPage';
import Login from './Login';
import Register from './Register';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
  },
});

const App = () => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">Главная</Button>
            {token ? (
              <>
                <Button color="inherit" component={Link} to="/register">Регистрация</Button>
                <Button color="inherit" component={Link} to="/login">Вход</Button>
                <Button color="inherit" component={Link} to="/dashboard">Личный кабинет</Button>
                <Button color="inherit" component={Link} to="/cart"> Корзина ({cart.length})</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/register">Регистрация</Button>
                <Button color="inherit" component={Link} to="/login">Вход</Button>
                <Button color="inherit" component={Link} to="/dashboard">Личный кабинет</Button>
                <Button color="inherit" component={Link} to="/cart"> Корзина ({cart.length})</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage setCart={setCart} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Login />} />
            <Route path="/cart" element={<CartPage cart={cart} />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

const sendData = async () => {
  const data = { key: "value" };

  try {
    const response = await fetch("http://localhost:8000/api/data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Response from server:", result);
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

sendData();

export default App;
