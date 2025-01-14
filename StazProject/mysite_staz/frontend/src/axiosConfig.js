// mysite_staz/frontend/src/axiosConfig.js
// import axios from 'axios';
//
// // Создаем экземпляр axios
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8000/api',
// });
//
// // Добавляем интерсептор для добавления заголовка Authorization
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });
//
// export default axiosInstance;

import axiosInstance from './axiosConfig';

// Пример запроса в `cart.js`
const fetchCart = async () => {
    try {
        const response = await axiosInstance.get('/cart/');
        setCart(response.data);
    } catch (err) {
        setError("Не удалось загрузить данные о корзине.");
    } finally {
        setLoading(false);
    }
};

