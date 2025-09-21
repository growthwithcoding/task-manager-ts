// src/state/TaskContext.tsx
// Wraps the app with a React Context for tasks
// Provides state + dispatch to any component via useTaskContext()

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { taskService } from "@/data/taskService";
import { Task } from "@/types/task";
import { TaskState, taskReducer, TaskAction } from "./taskReducer";

interface TaskContextValue extends TaskState {
  dispatch: React.Dispatch<TaskAction>;
}

// Context for our tasks
const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

  // Load tasks from localStorage when app starts
  useEffect(() => {
    dispatch({ type: "set", payload: taskService.list() });
  }, []);

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook to use the context safely
export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within TaskProvider");
  return ctx;
}
