import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/phones";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchPhones = async () => {
  const res = await api.get("/");
  return res.data.data;
};

export const fetchPhoneById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data.data;
};

export const createPhone = async (phoneData) => {
  const res = await api.post("/", phoneData);
  return res.data.data;
};

export const updatePhone = async (id, phoneData) => {
  const res = await api.put(`/${id}`, phoneData);
  return res.data.data;
};

export const deletePhone = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export default api;
