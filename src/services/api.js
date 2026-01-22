import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 15000,
});

export async function fetchProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function fetchProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
