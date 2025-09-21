// src/pages/Dashboard.tsx
// Home page showing all tasks with search + Add button

import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTasks } from "@/state/useTasks";
import TaskList from "@/components/TaskList";

export default function Dashboard() {
  const { tasks } = useTasks();
  const [query, setQuery] = useState("");

  // Filter tasks on the fly when user types in search box
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description ?? "").toLowerCase().includes(q)
    );
  }, [tasks, query]);

  return (
    <section className="card">
      <div className="card-header">
        <div className="section-title">Tasks</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* Simple search box */}
          <div className="searchbar">
            <input
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn icon" aria-label="Search">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Link to create new task */}
          <Link className="btn primary" to="/tasks/new">
            + Add Task
          </Link>
        </div>
      </div>

      <div className="card-body">
        <TaskList tasks={filtered} />
      </div>
    </section>
  );
}
