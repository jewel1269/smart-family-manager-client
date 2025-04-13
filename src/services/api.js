// api.js
import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (data) => API.post('/auth/login', data);
export const fetchExpenses = () => API.get('/expenses');
// ...etc
