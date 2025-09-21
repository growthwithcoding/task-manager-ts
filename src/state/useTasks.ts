// src/state/useTasks.ts
// Custom hook on top of TaskContext that hides reducer dispatch
// Exposes friendly methods: list, get, create, update, remove

import { useMemo } from "react";
import { taskService } from "@/data/taskService";
import { useTaskContext } from "./TaskContext";
import { NewTask, TaskPatch, Task } from "@/types/task";

export function useTasks() {
  const { tasks, dispatch } = useTaskContext();

  return useMemo(
    () => ({
      tasks,
      get: (id: string) => taskService.get(id),
      create: (input: NewTask): Task => {
        const created = taskService.create(input);
        dispatch({ type: "add", payload: created });
        return created;
      },
      update: (id: string, patch: TaskPatch): Task => {
        const updated = taskService.update(id, patch);
        dispatch({ type: "update", payload: updated });
        return updated;
      },
      remove: (id: string) => {
        taskService.remove(id);
        dispatch({ type: "remove", payload: id });
      },
    }),
    [tasks, dispatch]
  );
}
