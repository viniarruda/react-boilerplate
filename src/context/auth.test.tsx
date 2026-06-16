import type { ReactNode } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { AuthProvider, useAuth } from '@/context/auth';

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.accessToken).toBeNull();
  });

  it('stores the token on login and clears it on logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.login('token-123'));
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.accessToken).toBe('token-123');
    expect(localStorage.getItem('accessToken')).toBe('token-123');

    act(() => result.current.logout());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.accessToken).toBeNull();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });
});
