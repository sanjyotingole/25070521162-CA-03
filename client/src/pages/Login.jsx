import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import AuthShell from "../components/AuthShell.jsx";

export default function Login({ onAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      onAuth(await api.post("/auth/login", form));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to see your tasks."
      footer={<>New to FLEXI? <Link to="/register">Create an account</Link></>}
    >
      <form onSubmit={submit} className="stack">
        <label>Email
          <input name="email" type="email" value={form.email} onChange={change} required autoComplete="email" />
        </label>
        <label>Password
          <input name="password" type="password" value={form.password} onChange={change} required autoComplete="current-password" />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn primary" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
      </form>
    </AuthShell>
  );
}
