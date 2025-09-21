// src/App.tsx
// Root layout shell: header bar + space where pages render via <Outlet />

import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  // Grab auth state from Auth0
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className="app-shell">
      {/* Top bar with branding + login/logout */}
      <div className="topbar">
        <div className="brand">
          <span className="logo">📁</span>
          <Link to="/">Task Manager</Link>
        </div>
        <div className="top-actions">
          {isAuthenticated ? (
            <>
              <span className="subtle">Hi, {user?.name ?? "user"}</span>
              <button
                className="btn ghost"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </button>
            </>
          ) : (
            <button className="btn primary" onClick={() => loginWithRedirect()}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* This is where page routes render */}
      <Outlet />
    </div>
  );
}
