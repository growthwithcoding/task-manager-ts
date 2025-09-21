// src/pages/TaskDetails.tsx
// Simple read-only view of a task
// Lets user edit or delete from here

import { useParams, useNavigate, Link } from "react-router-dom";
import { useTasks } from "@/state/useTasks";

export default function TaskDetails() {
  const { id } = useParams();
  const { get, remove } = useTasks();
  const navigate = useNavigate();
  const task = id ? get(id) : undefined;

  if (!task) return <p>Task not found.</p>;

  return (
    <section className="card">
      <div className="card-header">
        <h1 className="section-title">{task.title}</h1>
      </div>
      <div className="card-body">
        {task.description && <p>{task.description}</p>}
        <p>Priority: {task.priority}</p>
        <p>Status: {task.status}</p>
        {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleString()}</p>}
        <p><small>Updated: {new Date(task.updatedAt).toLocaleString()}</small></p>
        <div style={{ display: "flex", gap: 12, marginTop: "1rem" }}>
          <Link to={`/tasks/${task.id}/edit`} className="btn">Edit</Link>
          <button
            className="btn ghost"
            onClick={() => {
              remove(task.id);
              navigate("/");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
