import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { api, tokenStore } from "./api";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(!!tokenStore.get());
  const navigate = useNavigate();

  // Restore the session if a token is already saved
  useEffect(() => {
    if (!tokenStore.get()) return;
    api.get("/auth/me")
      .then(setUser)
      .catch(() => tokenStore.clear())
      .finally(() => setChecking(false));
  }, []);

  const handleAuth = ({ token, user }) => {
    tokenStore.set(token);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    tokenStore.clear();
    setUser(null);
    navigate("/login");
  };

  if (checking) return <p className="boot">Loading…</p>;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login onAuth={handleAuth} />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register onAuth={handleAuth} />} />
      <Route path="/" element={user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
