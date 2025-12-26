const API_URL = "http://localhost:8080/api/auth";

/**
 * LOGIN
 * @param {string} email
 * @param {string} password
 */
export async function loginApi(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Đăng nhập thất bại");
  }

  return res.json(); // { token, user }
}

/**
 * REGISTER
 * @param {string} email
 * @param {string} password
 */
export async function registerApi(email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Đăng ký thất bại");
  }

  return res.json(); // { token, user }
}

/**
 * LOGOUT
 * (Frontend only – JWT stateless)
 */
export function logoutApi() {
  localStorage.removeItem("token");
}

/**
 * Lấy token
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Header Authorization dùng cho API cần đăng nhập
 */
export function authHeader() {
  const token = getToken();
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
}
