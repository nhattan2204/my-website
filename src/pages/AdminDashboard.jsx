import React, { useEffect, useState } from "react";

export default function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
  });

  useEffect(() => {
    // 🔸 Demo data
    // Sau này bạn thay bằng API thật (fetch từ backend)
    setStats({
      users: 120,
      orders: 45,
      products: 18,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <span className="text-sm">👤 {user.email}</span>
      </div>

      {/* CONTENT */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* USERS */}
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-gray-500">Người dùng</h3>
          <p className="text-3xl font-bold mt-2">{stats.users}</p>
        </div>

        {/* ORDERS */}
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-gray-500">Đơn hàng</h3>
          <p className="text-3xl font-bold mt-2">{stats.orders}</p>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-gray-500">Sản phẩm</h3>
          <p className="text-3xl font-bold mt-2">{stats.products}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="p-6">
        <h2 className="font-bold mb-3">Quản lý nhanh</h2>

        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Quản lý sản phẩm
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Quản lý đơn hàng
          </button>

          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Quản lý người dùng
          </button>
        </div>
      </div>
    </div>
  );
}
