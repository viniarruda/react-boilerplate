export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/CLEAR_USER';

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});
