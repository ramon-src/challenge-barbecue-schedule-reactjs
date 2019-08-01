const isAuthenticated = () => {
  const authData = localStorage.getItem('auth');
  if (!authData) return false;
  let auth = JSON.parse(authData);
  return Boolean(auth);
};

const logout = () => {
  localStorage.setItem('auth', '');
};

const register = authData => {
  localStorage.setItem('auth', JSON.stringify(authData));
};

export default {
  isAuthenticated,
  logout,
  register
};
