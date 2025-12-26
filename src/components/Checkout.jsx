// ================= src/components/Checkout.jsx =================
import React, { useState } from "react";


export default function Checkout({ cart, total, onBack, onSubmit }) {
const [form, setForm] = useState({ name: "", phone: "", address: "" });


const submit = () => {
if (!form.name || !form.phone || !form.address) {
alert("Vui lòng nhập đầy đủ thông tin");
return;
}
onSubmit(form);
setForm({ name: "", phone: "", address: "" });
};


return (
<div className="min-h-screen bg-gray-100 p-6">
<div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
<h2 className="text-xl font-bold mb-4">Checkout</h2>


<input
placeholder="Họ tên"
className="w-full border p-2 rounded mb-3"
value={form.name}
onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
<input
placeholder="Số điện thoại"
className="w-full border p-2 rounded mb-3"
value={form.phone}
onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>
<textarea
placeholder="Địa chỉ giao hàng"
className="w-full border p-2 rounded mb-3"
value={form.address}
onChange={(e) => setForm({ ...form, address: e.target.value })}
/>


<div className="border-t pt-3 mb-3">
{cart.map((i) => (
<div key={i.id} className="flex justify-between text-sm">
<span>{i.name} x {i.qty}</span>
<span>{(i.price * i.qty).toLocaleString()} đ</span>
</div>
))}
</div>


<div className="flex justify-between font-bold mb-4">
<span>Tổng tiền</span>
<span className="text-blue-600">{total.toLocaleString()} đ</span>
</div>


<div className="flex gap-3">
<button onClick={onBack} className="flex-1 bg-gray-200 py-2 rounded">Quay lại</button>
<button onClick={submit} className="flex-1 bg-blue-500 text-white py-2 rounded">Đặt hàng</button>
</div>
</div>
</div>
);
}