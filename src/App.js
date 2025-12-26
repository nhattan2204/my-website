// ================= src/App.jsx =================
import React, { useState } from "react";
import Checkout from "./components/Checkout";


const products = [
{ id: 1, name: "Áo thun nam", price: 150000, image: "https://via.placeholder.com/200" },
{ id: 2, name: "Quần jean nữ", price: 350000, image: "https://via.placeholder.com/200" },
{ id: 3, name: "Giày sneaker", price: 800000, image: "https://via.placeholder.com/200" },
];


export default function App() {
const [cart, setCart] = useState([]);
const [showCheckout, setShowCheckout] = useState(false);


const addToCart = (product) => {
const exist = cart.find((i) => i.id === product.id);
if (exist) {
setCart(cart.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
} else {
setCart([...cart, { ...product, qty: 1 }]);
}
};


const increaseQty = (id) => setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
const decreaseQty = (id) => setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0));


const total = cart.reduce((s, i) => s + i.price * i.qty, 0);


const submitOrder = (form) => {
alert(`Đặt hàng thành công!\n${form.name} - ${form.phone}\nTổng tiền: ${total.toLocaleString()} đ`);
setCart([]);
setShowCheckout(false);
};


if (showCheckout) {
return <Checkout cart={cart} total={total} onBack={() => setShowCheckout(false)} onSubmit={submitOrder} />;
}


return (
<div className="min-h-screen bg-gray-100 pb-32">
<header className="bg-blue-600 text-white p-4 flex justify-between">
<h1 className="text-xl font-bold">Shop Online</h1>
<div>🛒 {cart.reduce((s, i) => s + i.qty, 0)}</div>
</header>


<main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{products.map((p) => (
<div key={p.id} className="bg-white rounded-2xl shadow p-4">
<img src={p.image} className="rounded mb-3" />
<h2 className="font-semibold">{p.name}</h2>
<p className="text-blue-600 font-bold mb-2">{p.price.toLocaleString()} đ</p>
<button onClick={() => addToCart(p)} className="w-full bg-blue-500 text-white py-2 rounded">Thêm vào giỏ</button>
</div>
))}
</main>


<footer className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow">
<div className="max-w-5xl mx-auto">
{cart.map((i) => (
<div key={i.id} className="flex justify-between items-center text-sm border-t py-1">
<span>{i.name}</span>
<div className="flex gap-2">
<button onClick={() => decreaseQty(i.id)}>-</button>
<span>{i.qty}</span>
<button onClick={() => increaseQty(i.id)}>+</button>
</div>
<span>{(i.price * i.qty).toLocaleString()} đ</span>
</div>
))}


<div className="flex justify-between font-bold mt-2">
<span>Tổng</span>
<span>{total.toLocaleString()} đ</span>
</div>


{cart.length > 0 && (
<button onClick={() => setShowCheckout(true)} className="w-full bg-green-500 text-white py-2 rounded mt-2">Thanh toán</button>
)}
</div>
</footer>
</div>
);
}