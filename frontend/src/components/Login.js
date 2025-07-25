import React, { useState } from "react";
import api from "../api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      onLogin(res.data.user, res.data.token);
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="auth-form" aria-label="Login Form">
      <h3>Login</h3>
      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        autoComplete="username"
      />
      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
      {err && (
        <div className="error" aria-live="polite" role="alert">
          {err}
        </div>
      )}
    </form>
  );
}

export default Login;