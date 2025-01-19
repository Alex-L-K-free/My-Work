// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/api/' });

export const fetchBooks = () => API.get('books/');
export const fetchCart = (token) => API.get('cart/', { headers: { Authorization: `Bearer ${token}` } });
export const addToCart = (bookId, token) =>
    API.post('cart/', { book_id: bookId }, { headers: { Authorization: `Bearer ${token}` } });
export const removeFromCart = (bookId, token) =>
    API.delete('cart/', { data: { book_id: bookId }, headers: { Authorization: `Bearer ${token}` } });

export const login = (credentials) => API.post('token/', credentials);
export const refreshToken = (refreshToken) => API.post('token/refresh/', { refresh: refreshToken });
