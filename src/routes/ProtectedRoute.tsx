// src/routes/ProtectedRoute.tsx
// Wraps any route to require login before showing it

import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, Link } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  // If Auth0 redirected back with an error (e.g., user clicked "Decline")
  const params = new URLSearchParams(location.search);
  const authError = params.get("error"); // commonly "access_denied"
  const authErrorDesc = params.get("error_description") || "";

  // Only auto-redirect to Auth0 if we have no error signal
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !authError) {
      loginWithRedirect({
        appState: { returnTo: location.pathname + location.search },
      });
    }
  }, [isLoading, isAuthenticated, authError, location, loginWithRedirect]);

  if (isLoading) return <p>Loading...</p>;

  if (authError) {
    return (
      <section className="card">
        <div className="card-body" style={{ padding: 18 }}>
          <h2 className="section-title" style={{ padding: 0 }}>
            Authorization cancelled
          </h2>
          <p className="subtle">
            {authErrorDesc || "You declined access. To continue, sign in and accept permissions."}
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="btn primary"
              onClick={() =>
                loginWithRedirect({
                  // prompt 'login' ensures you go back to the provider chooser screen
                  authorizationParams: { prompt: "login" },
                })
              }
            >
              Try again
            </button>
            <Link className="btn ghost" to="/">Go home</Link>
          </div>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) return null;
  return <>{children}</>;
}