const today = () => new Date().toISOString().slice(0, 10);

const fmt = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "short" });

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const overdue = !task.completed && task.dueDate && task.dueDate < today();
  return (
    <li className={`task ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        className="check"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
      />
      <div className="task-body">
        <p className="task-title">{task.title}</p>
        <p className="task-meta">
          <span className={`dot ${task.priority}`} />
          {task.priority} priority
          {task.subject && <span> · {task.subject}</span>}
          {task.dueDate && <span className={overdue ? "overdue" : ""}> · {overdue ? "overdue, " : "due "}{fmt(task.dueDate)}</span>}
        </p>
      </div>
      <div className="task-actions">
        <button className="btn small" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn small danger" onClick={() => onDelete(task)}>Delete</button>
      </div>
    </li>
  );
}
