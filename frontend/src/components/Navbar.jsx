// src/components/Navbar.jsx
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg text-blue-600">
        Uyo Eats
      </Link>
      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/register" className="text-blue-600">Register</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
            <Link to="/cart" className="text-blue-600">Cart</Link>
            <button onClick={handleLogout} className="text-red-600">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
