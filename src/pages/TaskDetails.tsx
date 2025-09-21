import { Link, useNavigate, useParams } from "react-router-dom";
import { useTasks } from "@/state/useTasks";
import { Priority, Status } from "@/types/task";

function fmtDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}
function statusChip(s: Status) {
  switch (s) {
    case Status.Done: return { label: "Complete", cls: "complete" };
    case Status.InProgress: return { label: "In Progress", cls: "inprogress" };
    default: return { label: "Pending", cls: "pending" };
  }
}
function priorityDot(p: Priority) {
  return p === Priority.High ? "high" : p === Priority.Medium ? "medium" : "low";
}

export default function TaskDetails() {
  const { id } = useParams();
  const { get, remove } = useTasks();
  const navigate = useNavigate();
  const task = id ? get(id) : undefined;

  if (!task) {
    return (
      <section className="card">
        <div className="card-body"><p>Task not found.</p></div>
      </section>
    );
  }

  const s = statusChip(task.status);

  return (
    <section className="card">
      <div className="card-header">
        <div className="section-title" style={{ gap: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span className={`dot ${priorityDot(task.priority)}`} />
            <span style={{ fontSize: 22, fontWeight: 800 }}>{task.title}</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className={`chip ${s.cls}`}>{s.label}</span>
          <Link to="/" className="btn">← Back to Tasks</Link>
        </div>
      </div>

      <div className="card-body" style={{ padding: 18 }}>
        {/* Meta grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <div className="subtle" style={{ fontWeight: 700 }}>Priority</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={`dot ${priorityDot(task.priority)}`} />
              <span>{task.priority}</span>
            </div>
          </div>

          <div>
            <div className="subtle" style={{ fontWeight: 700 }}>Due</div>
            <div>{fmtDate(task.dueDate)}</div>
          </div>

          <div>
            <div className="subtle" style={{ fontWeight: 700 }}>Last Updated</div>
            <div>{fmtDate(task.updatedAt)}</div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginTop: 6, marginBottom: 18 }}>
          <div className="subtle" style={{ fontWeight: 700, marginBottom: 6 }}>Description</div>
          <p style={{ margin: 0 }}>{task.description || "—"}</p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <Link to={`/tasks/${task.id}/edit`} className="btn">Edit</Link>
          <button
            className="btn ghost"
            onClick={() => {
              if (confirm("Delete this task?")) {
                remove(task.id);
                navigate("/");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
