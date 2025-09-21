// src/components/TaskItem.tsx
// Renders a single task row inside the dashboard table
// Title links to details, status pill is clickable, Edit/Delete icons at right

import { Link, useNavigate } from "react-router-dom";
import { Task, Priority, Status } from "@/types/task";
import { useTasks } from "@/state/useTasks";
import { MouseEvent } from "react";

function priorityDot(p: Priority) {
  return p === Priority.High ? "high" : p === Priority.Medium ? "medium" : "low";
}

const STATUS_ORDER = [Status.Todo, Status.InProgress, Status.Done];
const nextStatus = (s: Status) =>
  STATUS_ORDER[(STATUS_ORDER.indexOf(s) + 1) % STATUS_ORDER.length];
const prevStatus = (s: Status) =>
  STATUS_ORDER[(STATUS_ORDER.indexOf(s) - 1 + STATUS_ORDER.length) % STATUS_ORDER.length];

function statusName(s: Status) {
  switch (s) {
    case Status.Done: return { label: "Complete", cls: "complete" };
    case Status.InProgress: return { label: "In Progress", cls: "inprogress" };
    default: return { label: "Pending", cls: "pending" };
  }
}

function initials(name?: string) {
  return (name ?? "You").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

export default function TaskItem({ task }: { task: Task }) {
  const status = statusName(task.status);
  const due = task.dueDate
    ? new Date(task.dueDate).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "—";
  const { remove, update } = useTasks();
  const navigate = useNavigate();

  const handleStatusClick = (e: MouseEvent) => {
    e.stopPropagation();
    update(task.id, { status: nextStatus(task.status) });
  };
  const handleStatusWheel: React.WheelEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    update(task.id, { status: e.deltaY > 0 ? nextStatus(task.status) : prevStatus(task.status) });
  };
  const handleStatusContext = (e: MouseEvent) => {
    e.preventDefault();
    update(task.id, { status: prevStatus(task.status) });
  };

  return (
    <li className="row">
      <input type="checkbox" aria-label="complete task" />

      <div className="cell-title">
        <span className={`dot ${priorityDot(task.priority)}`} />
        <div>
          <Link to={`/tasks/${task.id}`} className="title">{task.title}</Link>
          {task.description && <div className="subtle">{task.description}</div>}
        </div>
      </div>

      <div className="cell-assignee">
        <div className="avatar">{initials()}</div>
        <span className="subtle">Assignee</span>
      </div>

      <div>{due}</div>

      <div className="right">
        <span
          className={`chip ${status.cls}`}
          role="button"
          tabIndex={0}
          title="Click to change status (scroll or right-click to cycle)"
          onClick={handleStatusClick}
          onWheel={handleStatusWheel}
          onContextMenu={handleStatusContext}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {status.label}
        </span>
      </div>

      <div className="right" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          className="btn icon"
          title="Edit"
          onClick={() => navigate(`/tasks/${task.id}/edit`)}
          aria-label="Edit task"
        >
          {/* pencil icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Z" stroke="currentColor"/>
            <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.34 1.34 3.75 3.75 1.34-1.34Z" fill="currentColor"/>
          </svg>
        </button>
        <button
          className="btn icon"
          title="Delete"
          onClick={() => { if (confirm("Delete this task?")) remove(task.id); }}
          aria-label="Delete task"
        >
          {/* trash icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 7h12M9 7V5h6v2m-8 0l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12" stroke="currentColor"/>
          </svg>
        </button>
      </div>
    </li>
  );
}
