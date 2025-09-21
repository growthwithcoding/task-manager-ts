// src/routes/ProtectedRoute.tsx
// Wraps any route to require login before showing it

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    // Kick user to Auth0 login page
    loginWithRedirect();
    return null;
  }

  // If logged in, show the children route/page
  return <>{children}</>;
}
