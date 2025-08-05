// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Dołącz token JWT do każdego żądania (jeśli istnieje)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ POBIERANIE KWIATÓW
export const fetchFlowers = () => api.get("/flowers");

// ✅ DODAWANIE KWIATU
export const createFlower = (flowerData) => api.post("/flowers", flowerData);

// ✅ USUWANIE KWIATU
export const deleteFlower = (id) => api.delete(`/flowers/${id}`);

// ✅ REJESTRACJA UŻYTKOWNIKA
export const registerUser = (userData) => api.post("/register", userData);

// ✅ LOGOWANIE (zwraca token)
export const loginUser = (credentials) => api.post("/login", credentials);
