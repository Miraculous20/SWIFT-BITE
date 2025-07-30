// src/pages/Menu.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`/api/restaurants/${id}/menu`).then((res) => setMenu(res.data));
  }, [id]);

  const addToCart = (item) => {
    const exists = cart.find((i) => i.menu_item_id === item.id);
    if (exists) {
      setCart(
        cart.map((i) =>
          i.menu_item_id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { menu_item_id: item.id, quantity: 1, name: item.name, price: item.price }]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ restaurant_id: id, items: cart }));
  }, [cart]);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h1 className="text-xl font-bold mb-4">Menu</h1>
      <div className="space-y-4">
        {menu.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm font-bold">${item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
