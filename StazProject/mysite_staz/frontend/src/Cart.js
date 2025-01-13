// mysite_staz/frontend/src/cart.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);  // Установим начальное значение loading в true

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
    }, []);  // Пустой массив, чтобы выполнить эффект только один раз при монтировании компонента

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

