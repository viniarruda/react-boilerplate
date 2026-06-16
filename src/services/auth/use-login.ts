import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/context/auth';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

/**
 * Mocked login. Swap the body for a real `api.post('/auth/login', credentials)`
 * call when wiring a backend — the rest of the flow stays the same.
 *
 * Any non-empty username/password resolves with a fake bearer token.
 */
async function mockLogin({ username, password }: LoginCredentials): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (!username.trim() || !password.trim()) {
    throw new Error('Username and password are required.');
  }

  const accessToken = `mock.${btoa(`${username}:${Date.now()}`)}.token`;
  return { accessToken };
}

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: mockLogin,
    onSuccess: ({ accessToken }) => {
      login(accessToken);
    },
  });
}
