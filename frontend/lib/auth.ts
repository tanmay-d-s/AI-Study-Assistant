export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
}