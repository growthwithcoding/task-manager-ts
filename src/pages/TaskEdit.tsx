// src/pages/TaskEdit.tsx
// Page to edit an existing task
// Loads the task by ID, pre-fills the form, and updates on save

import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/state/useTasks";

// Convert ISO to value accepted by <input type="datetime-local"> (local timezone)
function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, update } = useTasks();

  const task = useMemo(() => (id ? get(id) : undefined), [id, get]);

  if (!id) return <section className="card"><div className="card-body"><p>Missing id.</p></div></section>;
  if (!task) return <section className="card"><div className="card-body"><p>Task not found.</p></div></section>;

  return (
    <section className="card">
      <div className="card-header">
        <h1 className="section-title">Edit Task</h1>
      </div>
      <div className="card-body">
        <TaskForm
          defaultValues={{
            title: task.title,
            description: task.description ?? "",
            priority: task.priority,
            status: task.status,
            dueDate: toLocalInput(task.dueDate),
          }}
          onSubmit={(values) => {
            const updated = update(task.id, {
              title: values.title,
              description: values.description || undefined,
              priority: values.priority,
              status: values.status,
              dueDate: values.dueDate,
            });
            navigate(`/tasks/${updated.id}`);
          }}
          submitLabel="Update"
        />
      </div>
    </section>
  );
}
