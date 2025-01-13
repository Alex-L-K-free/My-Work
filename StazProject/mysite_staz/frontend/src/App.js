import './App.css';
// import React, { useState, useEffect } from 'react';
// import Dashboard from './Dashboard';
// import Login from './Login';
// import Cart from './Cart';  // Импортируем компонент Cart

// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
// import ProductDetails from './ProductDetails';
import Cart from './Cart';
// import Orders from './Orders';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/cart">Cart</a></li>
            {/*<li><a href="/orders">Orders</a></li>*/}
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/cart" component={Cart} />
          {/*<Route path="/orders" component={Orders} />*/}
          {/*<Route path="/products/:id" component={ProductDetails} />*/}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


// const App = () => {
//     const [token, setToken] = useState(localStorage.getItem('access_token') || '');
//
//     useEffect(() => {
//         const savedToken = localStorage.getItem('access_token');
//         if (savedToken) setToken(savedToken);
//     }, []);
//
//     return (
//         <div className="app">
//             {token ? (
//                 <div>
//                     <Dashboard token={token} setToken={setToken} />
//                     <Cart /> {/* Добавляем компонент Cart */}
//                 </div>
//             ) : (
//                 <Login setToken={setToken} />
//             )}
//         </div>
//     );
// };
//
// export default App;

// import './App.css';
// import React, { useState, useEffect } from 'react';
// import Dashboard from './Dashboard';
// import Login from './Login';
//
// const App = () => {
//     const [token, setToken] = useState(localStorage.getItem('access_token') || '');
//
//     useEffect(() => {
//         // Восстановление токена при монтировании
//         const savedToken = localStorage.getItem('access_token');
//         if (savedToken) setToken(savedToken);
//     }, []);
//
//     return (
//         <div className="app">
//             {token ? (
//                 <Dashboard token={token} setToken={setToken} />
//             ) : (
//                 <Login setToken={setToken} />
//             )}
//         </div>
//     );
// };
//
// export default App;





// // import logo from './logo.svg';
// import './App.css';
// import React, { useState } from 'react';
// import Dashboard from './Dashboard';
// import Login from './Login';  // Импортируем компонент авторизации
//
// const App = () => {
//     // Состояние для хранения токена (используется для проверки, вошел ли пользователь)
//     const [token, setToken] = useState(localStorage.getItem('access_token') || '');
//
//     return (
//         <div className="app">
//             {token ? (
//                 <div>
//                     <h1>Добро пожаловать, пользователь!</h1>
//                     {/* Здесь можно показывать остальные компоненты сайта */}
//                     <Dashboard token={token} setToken={setToken} />
//                 </div>
//             ) : (
//                 // <Login setToken={setToken} />  {/* Если нет токена, показываем форму логина */}
//                 <Login setToken={setToken} />
//
//             )}
//         </div>
//     );
// };
//
// export default App;
//
//
// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }
// //
// // export default App;
