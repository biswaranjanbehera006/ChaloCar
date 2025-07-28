
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getCars = () => API.get("/cars");
export const bookCar = (data) => API.post("/booking", data);
export const getBookings = () => API.get("/booking");
