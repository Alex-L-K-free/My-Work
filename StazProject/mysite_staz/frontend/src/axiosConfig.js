// frontend/src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const fetchCart = async (token) => {
  try {
    const response = await instance.get('/cart/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;  // Возвращаем ответ
  } catch (err) {
    throw new Error('Ошибка при загрузке корзины');
  }
};

export default instance;

