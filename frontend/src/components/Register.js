import React, { useState } from "react";
import api from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await api.post("/auth/register", { username, email, password });
      setMsg("Registered! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="auth-form" aria-label="Register Form">
      <h3>Register</h3>
      <label htmlFor="register-username">Username</label>
      <input
        id="register-username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
      />
      <label htmlFor="register-email">Email</label>
      <input
        id="register-email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        autoComplete="email"
      />
      <label htmlFor="register-password">Password</label>
      <input
        id="register-password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
        autoComplete="new-password"
      />
      <button type="submit">Register</button>
      {msg && (
        <div className="success" aria-live="polite" role="status">
          {msg}
        </div>
      )}
      {err && (
        <div className="error" aria-live="polite" role="alert">
          {err}
        </div>
      )}
    </form>
  );
}

export default Register;