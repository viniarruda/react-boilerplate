import * as React from 'react';

import { api } from '@/services/api';

const TOKEN_STORAGE_KEY = 'accessToken';

export interface AuthContextValue {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = React.useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  );

  // Register a request interceptor that injects the bearer token. It is
  // re-registered whenever the token changes so requests always carry the
  // current credentials.
  React.useEffect(() => {
    const interceptorId = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptorId);
    };
  }, [accessToken]);

  const login = React.useCallback((token: string) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setAccessToken(token);
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAccessToken(null);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(accessToken),
      accessToken,
      login,
      logout,
    }),
    [accessToken, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}
