import api from "../api";

export async function signup(
  full_name: string,
  email: string,
  password: string
) {
  const response = await api.post("/auth/signup", {
    full_name,
    email,
    password,
  });

  return response.data;
}

export async function login(
  email: string,
  password: string
) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}