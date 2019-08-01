import Auth from 'services/Auth';
import('test-mocks/browserMocks');

describe('Auth', () => {
  const loggedJSON = JSON.stringify({
    id: 231,
    username: 'Ramon',
    email: 'ramon@gmail.com'
  });
  beforeEach(() => {
    window.localStorage.setItem('auth', '');
  });

  describe('isAuthenticated', () => {
    it('should be authenticated when auth item is truthy and has id', () => {
      window.localStorage.setItem('auth', loggedJSON);
      expect(Auth.isAuthenticated()).toBe(true);
    });
    it('should be not authenticated when auth item is falsy', () => {
      expect(Auth.isAuthenticated()).toBe(false);
    });
  });

  describe('logout', () => {
    it('should be not authenticated after logout action', () => {
      window.localStorage.setItem('auth', loggedJSON);

      Auth.logout();

      expect(Auth.isAuthenticated()).toBe(false);
    });
  });
  describe('register', () => {
    it('should register a user in the localstorage', () => {
      Auth.register({ id: 231, username: 'Ramon', email: 'ramon@gmail.com' });
      expect(window.localStorage.getItem('auth')).toBe(loggedJSON);
    });
  });
});
