// frontend/src/CartPage.js
import React from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';

const CartPage = ({ cart }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ваша корзина
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Корзина пуста</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <ListItem key={index}>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">{`₽${item.price}`}</Typography>
            </ListItem>
          ))}
        </List>
      )}
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Оформить заказ
      </Button>
    </Box>
  );
};

export default CartPage;





// // frontend/src/CartPage.js
// import React from 'react';
// import { Box, Typography, List, ListItem, Button } from '@mui/material';
// import Cart from './Cart'; // Если это отдельный компонент для отображения товаров
//
// const CartPage = ({ cart }) => {
//   return (
//     <Box sx={{ textAlign: 'center', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Ваша корзина
//       </Typography>
//       {cart.length === 0 ? (
//         <Typography variant="h6">Корзина пуста</Typography>
//       ) : (
//         <List>
//           {cart.map((item, index) => (
//             <ListItem key={index}>
//               <Typography variant="body1">{item.name}</Typography>
//               <Typography variant="body2" color="textSecondary">{`₽${item.price}`}</Typography>
//             </ListItem>
//           ))}
//         </List>
//       )}
//       <Button variant="contained" color="primary" sx={{ mt: 3 }}>
//         Оформить заказ
//       </Button>
//     </Box>
//   );
// };
//
// export default CartPage;



// // frontend/src/CartPage.js - страница для отображения корзины
// import React from 'react';
// import Cart from './Cart';
//
// const CartPage = () => {
//   const userToken = localStorage.getItem('access_token'); // Замените на реальный токен
//
//   return (
//     <div>
//       <h1>Страница корзины</h1>
//       <Cart token={userToken} />
//     </div>
//   );
// };
//
// export default CartPage;
