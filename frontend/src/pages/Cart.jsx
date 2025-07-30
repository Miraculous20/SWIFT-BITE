// src/pages/Cart.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Cart() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], restaurant_id: null });

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    try {
      const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      await axios.post(
        "/api/orders",
        {
          restaurant_id: cart.restaurant_id,
          items: cart.items,
          total,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/dashboard");
    } catch (err) {
      alert("Checkout failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.items.map((item) => (
              <li key={item.menu_item_id} className="border p-3 rounded shadow">
                {item.name} × {item.quantity} — ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">
            Total: $
            {cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
          </p>
          {user?.role === "customer" && (
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-green-600 text-white p-2 rounded"
            >
              Place Order
            </button>
          )}
        </>
      )}
    </div>
  );
}
