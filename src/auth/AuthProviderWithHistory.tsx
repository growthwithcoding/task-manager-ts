import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProviderWithHistory: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
  const authorizationParams = {
    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK ?? window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE || undefined,
  } as const;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={authorizationParams}
    >
      {children}
    </Auth0Provider>
  );
};
