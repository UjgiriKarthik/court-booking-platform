import React, { useState } from "react";
import { signupApi } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signup.css";   // <-- ADD THIS

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = await signupApi(form.name, form.email, form.password);

    if (!result) {
      setError("Signup failed.");
      return;
    }

    alert("Signup successful! Please login.");
    navigate("/login");
  }

  return (
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create Account</h2>

        {error && <p className="signup-error">{error}</p>}

        <label className="signup-label">Name</label>
        <input
          name="name"
          className="signup-input"
          onChange={handleChange}
          required
        />

        <label className="signup-label">Email</label>
        <input
          name="email"
          className="signup-input"
          type="email"
          onChange={handleChange}
          required
        />

        <label className="signup-label">Password</label>
        <input
          type="password"
          name="password"
          className="signup-input"
          onChange={handleChange}
          required
        />

        <button className="signup-btn">Sign Up</button>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link className="signup-link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
