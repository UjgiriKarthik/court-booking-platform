import React, { useState } from "react";
import { loginApi } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";   // <-- ADD THIS

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = await loginApi(form.email, form.password);

    if (!result || !result.token) {
      setError("Invalid credentials");
      return;
    }

    setUser(result.user);
    setToken(result.token);
    navigate("/");
  }

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <label className="login-label">Email</label>
        <input
          type="email"
          name="email"
          className="login-input"
          onChange={handleChange}
          required
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          name="password"
          className="login-input"
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-btn">Login</button>

        <p className="login-footer">
          Don’t have an account?{" "}
          <Link className="login-link" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
