// frontend/src/app.js
import './App.css'; // Импортируем стили
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импортируем необходимые компоненты для маршрутизации
import HomePage from './HomePage'; // Импортируем страницу главного экрана
import Dashboard from './Dashboard'; // Импортируем компонент Dashboard
import Cart from './Cart'; // Импортируем корзину

// Поддерживаемые браузеры
const supportedBrowsers = ['Firefox'];

// Функция для проверки браузера
const isSupportedBrowser = () => {
  const userAgent = navigator.userAgent;
  return supportedBrowsers.some(browser => userAgent.includes(browser));
};

function App() {
  if (!isSupportedBrowser()) {
    return (
      <div className="unsupported-browser">
        <h1>Этот браузер не поддерживается</h1>
        <p>Пожалуйста, используйте один из поддерживаемых браузеров: Chrome, Firefox или Safari.</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />
        {/* Панель управления */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Страница корзины */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;





