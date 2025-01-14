// frontend/src/App.js
import './style.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Cart from './Cart';
import Login from './Login';
import ProfilePage from './ProfilePage';
import AdminPanel from './AdminPanel';
import Register from './Register';
// import theme from './theme';
import CartPage from './CartPage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <h1>Добро пожаловать в наш книжный магазин</h1>
          {/* Другие компоненты */}
        </div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Главная
            </Button>
            {token ? (
              <>
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/cart">
                  Корзина
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  Профиль
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Вход
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Регистрация
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<HomePage />} />
            {/*<Route path="/login" element={<Login setToken={setToken} />} />*/}
            {/*<Route path="/register" element={<Register />} />*/}
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard token={token} /></ProtectedRoute>}
            />
            <Route
              path="/cart"
              element={<ProtectedRoute><Cart token={token} /></ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><ProfilePage token={token} /></ProtectedRoute>}
            />
            <Route
              path="/admin"
              element={<ProtectedRoute><AdminPanel token={token} /></ProtectedRoute>}
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;




