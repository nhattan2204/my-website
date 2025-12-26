import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Shop from "./pages/Shop";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // ===== CART =====
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) =>
    setCart(cart.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));

  const decreaseQty = (id) =>
    setCart(
      cart
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );

  const removeFromCart = (id) =>
    setCart(cart.filter((p) => p.id !== id));

  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  // ===== AUTH =====
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* HEADER */}
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">
          Shop Online
        </Link>

        <div className="flex gap-4 items-center">
          {!user && <Link to="/login">Đăng nhập</Link>}
          {!user && <Link to="/register">Đăng ký</Link>}

          {user && <span>{user.email}</span>}

          {user?.role === "admin" && (
            <Link to="/admin" className="bg-yellow-400 text-black px-2 rounded">
              Admin
            </Link>
          )}

          {user && (
            <button onClick={logout} className="bg-red-500 px-2 rounded">
              Đăng xuất
            </button>
          )}
        </div>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <Shop
              cart={cart}
              addToCart={addToCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
              total={total}
            />
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register onLogin={setUser} />}
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={user}>
              <Checkout cart={cart} total={total} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} adminOnly>
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
