import { useEffect, useState } from "react";
import { api } from "../api";
import TaskForm from "../components/TaskForm.jsx";
import TaskItem from "../components/TaskItem.jsx";

export default function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // READ: load this user's tasks from MongoDB through the API
  useEffect(() => {
    api.get("/tasks")
      .then(setTasks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // CREATE (POST) or UPDATE (PUT) depending on whether a task is being edited
  const saveTask = async (form) => {
    setError("");
    try {
      if (editing) {
        const updated = await api.put(`/tasks/${editing._id}`, form);
        setTasks((t) => t.map((x) => (x._id === updated._id ? updated : x)));
        setEditing(null);
      } else {
        const created = await api.post("/tasks", form);
        setTasks((t) => [created, ...t]);
      }
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  };

  // UPDATE (PUT): mark completed / not completed
  const toggle = async (task) => {
    try {
      const updated = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      setTasks((t) => t.map((x) => (x._id === updated._id ? updated : x)));
    } catch (e) {
      setError(e.message);
    }
  };

  // DELETE
  const remove = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await api.del(`/tasks/${task._id}`);
      setTasks((t) => t.filter((x) => x._id !== task._id));
      if (editing?._id === task._id) setEditing(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const doneCount = tasks.filter((t) => t.completed).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  const shown = tasks.filter((t) => (filter === "all" ? true : filter === "done" ? t.completed : !t.completed));

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand small">FLEXI</h1>
        <div className="who">
          <span>{user.name}</span>
          <button className="btn small" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="dash">
        <aside>
          <TaskForm editing={editing} onSubmit={saveTask} onCancel={() => setEditing(null)} />
        </aside>

        <section>
          <div className="panel progress">
            <div>
              <h2>Hi {user.name.split(" ")[0]}, {tasks.length === 0 ? "ready to plan your week?" : `${doneCount} of ${tasks.length} done`}</h2>
              <p className="muted">{tasks.length - doneCount} still to do</p>
            </div>
            <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
              <span style={{ width: pct + "%" }} />
            </div>
            <strong className="pct">{pct}%</strong>
          </div>

          <div className="tabs" role="tablist">
            {[["all", "All"], ["pending", "To do"], ["done", "Completed"]].map(([k, label]) => (
              <button key={k} className={filter === k ? "tab on" : "tab"} onClick={() => setFilter(k)}>{label}</button>
            ))}
          </div>

          {error && <p className="error" role="alert">{error}</p>}
          {loading ? (
            <p className="muted">Loading your tasks…</p>
          ) : shown.length === 0 ? (
            <p className="empty">{tasks.length === 0 ? "No tasks yet. Add your first one on the left." : "Nothing in this view."}</p>
          ) : (
            <ul className="tasks">
              {shown.map((t) => (
                <TaskItem key={t._id} task={t} onToggle={toggle} onEdit={setEditing} onDelete={remove} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
