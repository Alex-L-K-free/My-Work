// frontend/src/Cart.js
// import React, { useState, useEffect } from 'react';
// import { fetchCart } from './axiosConfig';
//
// import React from 'react';
// import useFetchData from './hooks/useFetchData'; // Импорт хука
// import { fetchCart } from './axiosConfig'; // Импорт функции для запроса API

import React from 'react';
import useFetchData from './hooks/useFetchData'; // Импорт хука
import { fetchCart } from './axiosConfig'; // Импорт функции для запроса API

const Cart = ({ token }) => {
  const { data: cart, error, loading } = useFetchData(fetchCart, token);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Ваша корзина</h2>
      <ul>
        {cart.length === 0 ? (
          <li>Ваша корзина пуста</li>
        ) : (
          cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} руб.
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;


// const Cart = ({ token }) => {
//   // Используем хук useFetchData
//   const { data: cart, error, loading } = useFetchData(fetchCart, token);
//
//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>{error}</div>;
//
//   return (
//     <div>
//       <h2>Ваша корзина</h2>
//       <ul>
//         {cart.length === 0 ? (
//           <li>Ваша корзина пуста</li>
//         ) : (
//           cart.map((item) => (
//             <li key={item.id}>
//               {item.name} - {item.price} руб.
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };
//
// export default Cart;




// const Cart = ({ token }) => {
//   const [cart, setCart] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     const loadCart = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchCart(token);
//         setCart(response.data);
//       } catch (err) {
//         setError('Ошибка при загрузке корзины');
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     loadCart();
//   }, [token]);
//
//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>{error}</div>;
//
//   return (
//     <div>
//       <h2>Ваша корзина</h2>
//       <ul>
//         {cart.length === 0 ? (
//           <li>Ваша корзина пуста</li>
//         ) : (
//           cart.map((item) => (
//             <li key={item.id}>
//               {item.name} - {item.price} руб.
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };
//
// export default Cart;


