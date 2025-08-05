import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Dodaje token do każdego zapytania, jeśli istnieje
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (userData) => API.post('/register', userData);

export const loginUser = (data) => API.post('/login', data);

// Flowers
export const fetchFlowers = () => API.get('/flowers');
export const createFlower = (flowerData) => API.post('/flowers', flowerData);
export const deleteFlower = (id) => API.delete(`/flowers/${id}`);
export const updateFlower = (id, data) => API.put(`/flowers/${id}`, data);
export const getFlower = (id) => API.get(`/flowers/${id}`);

export default API;
