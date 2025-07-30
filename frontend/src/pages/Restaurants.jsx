// src/pages/Restaurants.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../api";
API.post("/auth/login", form);

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("/api/restaurants").then(res => setRestaurants(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Restaurants in Uyo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.map(r => (
          <Link
            key={r.id}
            to={`/restaurant/${r.id}/menu`}
            className="p-4 border rounded shadow hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{r.name}</h2>
            <p className="text-sm text-gray-600">{r.description}</p>
            <p className="text-xs">{r.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
