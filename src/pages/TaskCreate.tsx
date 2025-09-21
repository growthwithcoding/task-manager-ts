// src/pages/TaskCreate.tsx
// Page for creating a new task
// After saving, we show a toast and navigate back to dashboard

import { useNavigate } from "react-router-dom";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/state/useTasks";
import { useToast } from "@/ui/Toast";

export default function TaskCreate() {
  const { create } = useTasks();
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <section className="card">
      <div className="card-header">
        <h1 className="section-title">New Task</h1>
      </div>
      <div className="card-body">
        <TaskForm
          onSubmit={(values) => {
            const task = create({
              title: values.title,
              description: values.description || undefined,
              priority: values.priority,
              status: values.status,
              dueDate: values.dueDate,
            });

            toast.success("Task created");
            navigate("/"); // back to dashboard
            // or navigate(`/tasks/${task.id}`) if we want details
          }}
          submitLabel="Create Task"
        />
      </div>
    </section>
  );
}
