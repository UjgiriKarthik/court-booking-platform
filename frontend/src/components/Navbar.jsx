// frontend/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();       // clear token + user
    navigate("/login"); // redirect to login
  }

  return (
    <nav className="navbar">

      {/* LEFT MENU */}
      <div className="nav-left">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/courts" className="nav-link">Courts</Link>
        <Link to="/equipment" className="nav-link">Equipment</Link>
        <Link to="/coaches" className="nav-link">Coaches</Link>
      </div>

      {/* RIGHT MENU */}
      <div className="nav-right">
        {token ? (
          <>
            <Link to="/admin" className="nav-link">Admin</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>

    </nav>
  );
}
