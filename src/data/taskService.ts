// src/data/taskService.ts
// Handles persistence for tasks (localStorage right now)
// Could be swapped out later for an API service

import { Task, NewTask, TaskPatch } from "@/types/task";

const KEY = "tasks:v1";

function load(): Task[] {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Task[]) : [];
}

function save(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export const taskService = {
  list: (): Task[] =>
    load().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),

  get: (id: string): Task | undefined => load().find((t) => t.id === id),

  create: (input: NewTask): Task => {
    const now = new Date().toISOString();
    const task: Task = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...input,
    };
    const tasks = load();
    tasks.unshift(task);
    save(tasks);
    return task;
  },

  update: (id: string, patch: TaskPatch): Task => {
    const tasks = load();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Task not found");

    const updated = {
      ...tasks[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    tasks[idx] = updated;
    save(tasks);
    return updated;
  },

  remove: (id: string) => {
    const tasks = load().filter((t) => t.id !== id);
    save(tasks);
  },
};
