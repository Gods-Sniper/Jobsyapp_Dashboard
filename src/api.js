import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

const token = localStorage.getItem("token");

console.log("Token from localStorage:", token);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
