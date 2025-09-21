// src/components/TaskForm.tsx
// Shared form used by both Create and Edit pages
// Uses react-hook-form + zod for validation
// Splits date+time inputs and merges back to ISO string

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { taskSchema } from "@/types/taskSchema";
import { Priority, Status } from "@/types/task";

type TaskFormInput = z.input<typeof taskSchema>;   // raw input shape
type TaskFormOutput = z.output<typeof taskSchema>; // final validated shape

function splitLocal(isoOrEmpty: string | undefined) {
  if (!isoOrEmpty) return { date: "", time: "" };
  const d = new Date(isoOrEmpty);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  const iso = d.toISOString().slice(0, 16);
  const [date, time] = iso.split("T");
  return { date, time };
}
function combineLocal(date: string, time: string) {
  if (!date && !time) return "";
  const safeTime = time || "00:00";
  const local = new Date(`${date}T${safeTime}`);
  return isNaN(local.getTime()) ? "" : local.toISOString();
}

interface Props {
  defaultValues?: Partial<TaskFormInput>;
  onSubmit: (values: TaskFormOutput) => void;
  submitLabel?: string;
}

export default function TaskForm({ defaultValues, onSubmit, submitLabel = "Save" }: Props) {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm<TaskFormInput, any, TaskFormOutput>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        title: "",
        description: "",
        priority: Priority.Medium,
        status: Status.Todo,
        dueDate: "",
        ...defaultValues,
      },
    });

  const initial = useMemo(
    () => splitLocal(defaultValues?.dueDate as string | undefined),
    [defaultValues?.dueDate]
  );
  const [datePart, setDatePart] = useState(initial.date);
  const [timePart, setTimePart] = useState(initial.time);

  useEffect(() => {
    setValue("dueDate", combineLocal(datePart, timePart), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [datePart, timePart, setValue]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title
        <input {...register("title")} placeholder="What needs to be done?" />
        {errors.title && <span role="alert">{errors.title.message as string}</span>}
      </label>

      <label>
        Description
        <textarea {...register("description")} placeholder="Add details, links, acceptance criteria…" />
        {errors.description && <span role="alert">{errors.description.message as string}</span>}
      </label>

      <label>
        Priority
        <select {...register("priority")}>
          {Object.values(Priority).map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </label>

      <label>
        Status
        <select {...register("status")}>
          {Object.values(Status).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      <label>
        Due Date &amp; Time
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input type="date" value={datePart} onChange={(e) => setDatePart(e.target.value)} />
          <input type="time" step={60} value={timePart} onChange={(e) => setTimePart(e.target.value)} />
        </div>
        {errors.dueDate && <span role="alert">{String(errors.dueDate.message)}</span>}
      </label>

      <div>
        <button type="submit" className="btn primary" disabled={isSubmitting}>{submitLabel}</button>
        <span className="subtle" style={{ marginLeft: 8 }}>{isSubmitting ? "Saving…" : ""}</span>
      </div>

      {/* hidden input so react-hook-form manages dueDate field */}
      <input type="hidden" {...register("dueDate")} />
    </form>
  );
}
