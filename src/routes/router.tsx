// src/routes/router.tsx
// All the app routes live here. Uses React Router v6+ (createBrowserRouter)

import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import TaskDetails from "@/pages/TaskDetails";
import TaskCreate from "@/pages/TaskCreate";
import TaskEdit from "@/pages/TaskEdit";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root shell (header + outlet)
    children: [
      {
        index: true, // default route (/)
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/new",
        element: (
          <ProtectedRoute>
            <TaskCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/:id",
        element: (
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/:id/edit",
        element: (
          <ProtectedRoute>
            <TaskEdit />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
