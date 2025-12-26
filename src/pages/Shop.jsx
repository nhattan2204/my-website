import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Áo thun", price: 120000 },
  { id: 2, name: "Quần jean", price: 350000 },
  { id: 3, name: "Giày sneaker", price: 800000 },
];

export default function Shop({
  cart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  total,
}) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.price.toLocaleString()} đ</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 mt-6 rounded shadow">
        <h2 className="font-bold">Giỏ hàng</h2>

        {cart.map((p) => (
          <div key={p.id} className="flex justify-between">
            <span>{p.name}</span>
            <div>
              <button onClick={() => decreaseQty(p.id)}>-</button>
              <span className="mx-2">{p.qty}</span>
              <button onClick={() => increaseQty(p.id)}>+</button>
              <button onClick={() => removeFromCart(p.id)}>❌</button>
            </div>
          </div>
        ))}

        <p className="font-bold mt-2">
          Tổng: {total.toLocaleString()} đ
        </p>

        <Link
          to="/checkout"
          className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded"
        >
          Thanh toán
        </Link>
      </div>
    </div>
  );
}
