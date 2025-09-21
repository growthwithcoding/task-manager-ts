// src/components/TaskList.tsx
// Renders the header row + a list of TaskItem components
// Falls back to a "no tasks" message if list is empty

import TaskItem from "./TaskItem";
import { Task } from "@/types/task";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) {
    return <div className="subtle" style={{ padding: 18 }}>No tasks yet.</div>;
  }
  return (
    <>
      <div className="row" style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>
        <div></div>
        <div>Task</div>
        <div>Assignee</div>
        <div>Date</div>
        <div className="right">Status</div>
        <div className="right">Actions</div>
      </div>

      <ul className="list">
        {tasks.map((t) => <TaskItem key={t.id} task={t} />)}
      </ul>
    </>
  );
}
