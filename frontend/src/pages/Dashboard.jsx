// src/pages/Dashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (orderId, status) => {
    const token = localStorage.getItem("token");
    await axios.patch(
      `/api/orders/${orderId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow">
              <p className="font-semibold">Order #{order.id}</p>
              <p>Status: <strong>{order.status}</strong></p>
              <p>Total: ${order.total}</p>
              {user.role !== "customer" && (
                <select
                  className="mt-2 border p-1 rounded"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  {["pending", "accepted", "preparing", "enroute", "delivered"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
