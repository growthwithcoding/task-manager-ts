// src/ui/Toast.tsx
// Minimal toast notification system for success/error/info popups
// Provider keeps toasts in state and auto-removes them after a timeout

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type Variant = "success" | "error" | "info";
type Toast = { id: number; msg: string; variant: Variant };

type ToastCtx = {
  push: (msg: string, variant?: Variant, ms?: number) => void;
  success: (msg: string, ms?: number) => void;
  error: (msg: string, ms?: number) => void;
  info: (msg: string, ms?: number) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(1);

  // Remove toast by ID
  const remove = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  // Add toast and auto-remove after timeout
  const push = useCallback((msg: string, variant: Variant = "info", ms = 2800) => {
    const id = idRef.current++;
    setToasts((t) => [...t, { id, msg, variant }]);
    window.setTimeout(() => remove(id), ms);
  }, [remove]);

  // Handy helpers for success/error/info
  const api = useMemo<ToastCtx>(() => ({
    push,
    success: (m, ms) => push(m, "success", ms),
    error: (m, ms) => push(m, "error", ms),
    info: (m, ms) => push(m, "info", ms),
  }), [push]);

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.variant}`} onClick={() => remove(t.id)}>
            {t.msg}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
