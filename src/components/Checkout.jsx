import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../services/authService";

export default function Checkout({ cart, total }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitOrder = async () => {
    setError("");

    if (!form.name || !form.phone || !form.address) {
      setError("Vui lòng nhập đầy đủ thông tin giao hàng");
      return;
    }

    if (cart.length === 0) {
      setError("Giỏ hàng đang trống");
      return;
    }

    try {
      setLoading(true);

      // 🔸 DEMO: gọi API tạo đơn hàng
      // Thay URL này bằng backend thật của bạn
      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(), // Authorization: Bearer <token>
        },
        body: JSON.stringify({
          customer: form,
          items: cart,
          total,
        }),
      });

      if (!res.ok) throw new Error("Tạo đơn hàng thất bại");

      setSuccess(true);

      // Quay về shop sau 2s
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Không thể đặt hàng, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-green-600 mb-2">
            🎉 Đặt hàng thành công!
          </h2>
          <p>Cảm ơn bạn đã mua hàng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {/* CART SUMMARY */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sản phẩm</h3>
          {cart.map((p) => (
            <div key={p.id} className="flex justify-between text-sm mb-1">
              <span>
                {p.name} x {p.qty}
              </span>
              <span>{(p.price * p.qty).toLocaleString()} đ</span>
            </div>
          ))}

          <p className="font-bold mt-2">
            Tổng tiền: {total.toLocaleString()} đ
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          <input
            name="name"
            placeholder="Họ tên"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={onChange}
          />

          <input
            name="phone"
            placeholder="Số điện thoại"
            className="w-full border p-2 rounded"
            value={form.phone}
            onChange={onChange}
          />

          <input
            name="address"
            placeholder="Địa chỉ giao hàng"
            className="w-full border p-2 rounded"
            value={form.address}
            onChange={onChange}
          />

          <textarea
            name="note"
            placeholder="Ghi chú (tuỳ chọn)"
            className="w-full border p-2 rounded"
            value={form.note}
            onChange={onChange}
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mt-3">
            {error}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Quay lại
          </button>

          <button
            onClick={submitOrder}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}
