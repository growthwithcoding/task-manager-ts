// src/state/taskReducer.ts
// Reducer function for managing tasks in Context
// We define our allowed actions and update state accordingly

import { Task } from "@/types/task";

export type TaskState = { tasks: Task[] };

// Actions our reducer understands
export type TaskAction =
  | { type: "set"; payload: Task[] }   // load initial list
  | { type: "add"; payload: Task }     // add one task
  | { type: "update"; payload: Task }  // replace a task
  | { type: "remove"; payload: string };// remove by id

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "set":
      return { tasks: action.payload };
    case "add":
      return { tasks: [action.payload, ...state.tasks] };
    case "update":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "remove":
      return { tasks: state.tasks.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
}
