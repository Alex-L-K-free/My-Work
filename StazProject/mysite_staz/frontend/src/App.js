// frontend/src/app.js
import './App.css'; // Импортируем стили
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Добавлен Navigate
import HomePage from './HomePage'; // Импортируем страницу главного экрана
import Dashboard from './Dashboard'; // Импортируем компонент Dashboard
import Cart from './Cart'; // Импортируем корзину
import Login from './Login'; // Добавлен компонент Login
import { useState } from 'react';

// Поддерживаемые браузеры
const supportedBrowsers = ['Firefox'];

// Функция для проверки браузера
const isSupportedBrowser = () => {
  const userAgent = navigator.userAgent;
  return supportedBrowsers.some(browser => userAgent.includes(browser));
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard token={token} setToken={setToken} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart token={token} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




// import './App.css'; // Импортируем стили
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импортируем необходимые компоненты для маршрутизации
// import HomePage from './HomePage'; // Импортируем страницу главного экрана
// import Dashboard from './Dashboard'; // Импортируем компонент Dashboard
// import Cart from './Cart'; // Импортируем корзину
//
// // Поддерживаемые браузеры
// const supportedBrowsers = ['Firefox'];
//
// // Функция для проверки браузера
// const isSupportedBrowser = () => {
//   const userAgent = navigator.userAgent;
//   return supportedBrowsers.some(browser => userAgent.includes(browser));
// };
//
// function App() {
//   if (!isSupportedBrowser()) {
//     return (
//       <div className="unsupported-browser">
//         <h1>Этот браузер не поддерживается</h1>
//         <p>Пожалуйста, используйте один из поддерживаемых браузеров: Chrome, Firefox или Safari.</p>
//       </div>
//     );
//   }
//
//   return (
//     <Router>
//       <Routes>
//         {/* Главная страница */}
//         <Route path="/" element={<HomePage />} />
//         {/* Панель управления */}
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* Страница корзины */}
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// }
//
// export default App;
//




