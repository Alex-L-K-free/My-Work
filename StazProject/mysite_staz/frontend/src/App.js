// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Cart from './Cart';
import Login from './Login';
import ProfilePage from './ProfilePage';
import AdminPanel from './AdminPanel';
import Register from './Register';
import Profile from './Profile';

// Поддерживаемые браузеры
const supportedBrowsers = ['Firefox'];

const isSupportedBrowser = () => {
  const userAgent = navigator.userAgent;
  return supportedBrowsers.some((browser) => userAgent.includes(browser));
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  if (!isSupportedBrowser()) {
    return (
      <div className="unsupported-browser">
        <h1>Этот браузер не поддерживается</h1>
        <p>Пожалуйста, используйте один из поддерживаемых браузеров: Firefox.</p>
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
      <Router>
        <nav>
          <Link to="/login">Вход</Link>
          <Link to="/register">Регистрация</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/profile">Личный кабинет</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login setToken={setToken}/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard token={token} setToken={setToken}/></ProtectedRoute>}/>
          <Route path="/cart" element={<ProtectedRoute><Cart token={token}/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage token={token}/></ProtectedRoute>}/>
          <Route path="/admin" element={<ProtectedRoute><AdminPanel token={token}/></ProtectedRoute>}/>
        </Routes>
      </Router>
  );
}

export default App;







