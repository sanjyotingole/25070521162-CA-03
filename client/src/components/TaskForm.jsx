import { useEffect, useState } from "react";

const empty = { title: "", subject: "", priority: "medium", dueDate: "" };

export default function TaskForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setForm(editing ? { title: editing.title, subject: editing.subject, priority: editing.priority, dueDate: editing.dueDate } : empty);
  }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const ok = await onSubmit(form);
    setBusy(false);
    if (ok) setForm(empty);
  };

  return (
    <form className="panel stack" onSubmit={submit}>
      <h2>{editing ? "Edit task" : "Add a task"}</h2>
      <label>What needs doing?
        <input name="title" value={form.title} onChange={change} maxLength={120} required placeholder="Complete DSA practical" />
      </label>
      <label>Subject
        <input name="subject" value={form.subject} onChange={change} placeholder="Data Structures" />
      </label>
      <div className="row2">
        <label>Priority
          <select name="priority" value={form.priority} onChange={change}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>Due date
          <input name="dueDate" type="date" value={form.dueDate} onChange={change} />
        </label>
      </div>
      <button className="btn primary" disabled={busy}>{editing ? "Save changes" : "Add task"}</button>
      {editing && <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
