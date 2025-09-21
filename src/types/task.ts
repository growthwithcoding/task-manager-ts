// src/types/task.ts
// Core type definitions for tasks used across the app

export type UUID = string;

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum Status {
  Todo = "Todo",
  InProgress = "InProgress",
  Done = "Done",
}

export interface Task {
  id: UUID;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;   // ISO string, optional
  createdAt: string;  // ISO timestamp
  updatedAt: string;  // ISO timestamp
  ownerSub?: string;  // Auth0 user.sub (links task to creator)
}

export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type TaskPatch = Partial<Omit<Task, "id" | "createdAt">>;
