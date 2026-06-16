import axios from 'axios';

/**
 * Shared axios instance used by every query/mutation.
 *
 * The `Authorization` header is injected at request time by the interceptor
 * registered inside `AuthProvider` (see `@/context/auth`), so the token always
 * reflects the latest auth state without recreating this client.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://fakestoreapi.com',
  timeout: 15000,
});
