import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import AuthShell from "../components/AuthShell.jsx";

export default function Register({ onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setBusy(true);
    try {
      onAuth(await api.post("/auth/register", form));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes a minute, and your tasks stay private to you."
      footer={<>Already registered? <Link to="/login">Log in</Link></>}
    >
      <form onSubmit={submit} className="stack">
        <label>Full name
          <input name="name" value={form.name} onChange={change} required autoComplete="name" />
        </label>
        <label>Email
          <input name="email" type="email" value={form.email} onChange={change} required autoComplete="email" />
        </label>
        <label>Password
          <input name="password" type="password" value={form.password} onChange={change} required autoComplete="new-password" />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn primary" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
      </form>
    </AuthShell>
  );
}
