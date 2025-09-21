// src/main.tsx
// Entry point for the entire React app
// This file mounts our App into the DOM and wraps it with providers (Auth, State, Toasts)

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProviderWithHistory } from "./auth/AuthProviderWithHistory";
import { TaskProvider } from "./state/TaskContext";
import { ToastProvider } from "./ui/Toast"; // handles notifications
import "./styles/globals.css";

// Render React into the root <div id="root"> inside index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Auth0 wrapper gives us login/logout + user context */}
    <AuthProviderWithHistory>
      {/* Global state for tasks (Context + Reducer) */}
      <TaskProvider>
        {/* Toast provider shows little success/error popups */}
        <ToastProvider>
          {/* RouterProvider wires up our pages and navigation */}
          <RouterProvider router={router} />
        </ToastProvider>
      </TaskProvider>
    </AuthProviderWithHistory>
  </React.StrictMode>
);
