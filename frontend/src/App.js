// frontend/src/App.js
// import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
    return (
        <Router>
            <div style={{ backgroundImage: 'url(/images/bookshelf.jpg)', backgroundSize: 'cover', height: '100vh' }}>
                <h1>Welcome to the Bookstore</h1>

                <MainLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </MainLayout>
            </div>
        </Router>
    );
};

export default App;




// import logo from './logo.svg';
// import './App.css';
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import CartPage from "./pages/CartPage";
// import LoginPage from "./pages/LoginPage";
// import MainLayout from "./layouts/MainLayout";
//
// const App = () => {
//     return (
//         <Router>
//             <MainLayout>
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/cart" element={<CartPage />} />
//                     <Route path="/login" element={<LoginPage />} />
//                 </Routes>
//             </MainLayout>
//         </Router>
//     );
// };
//
// export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
