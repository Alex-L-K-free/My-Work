import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/cart/");
                setCart(response.data);  // Записываем данные в состояние
            } catch (err) {
                setError("Не удалось загрузить данные о корзине.");
            } finally {
                setLoading(false);  // Завершаем загрузку
            }
        };

        fetchCart();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Ваша корзина</h2>
            <ul>
                {cart.length === 0 ? (
                    <li>Ваша корзина пуста</li>
                ) : (
                    cart.map(item => (
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


// import React, { useState, useEffect } from "react";
// import axios from "axios";
//
// const Cart = () => {
//     const [cart, setCart] = useState([]);
//
//     useEffect(() => {
//         axios.get("http://localhost:8000/api/cart/")
//             .then(response => setCart(response.data));
//     }, []);
//
//     return (
//         <div>
//             <h2>Your Cart</h2>
//             <ul>
//                 {cart.map(item => (
//                     <li key={item.id}>{item.name} - {item.price}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default Cart;
