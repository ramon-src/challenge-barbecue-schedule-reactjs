import URL from 'route/URL';

describe('URL constants', () => {
  describe('AUTH', () => {
    it('should LOGIN be /', () => {
      expect(URL.AUTH.LOGIN).toBe('/');
    });
    it('should SIGN_IN be /auth/signIn', () => {
      expect(URL.AUTH.SIGN_IN).toBe('/auth/signIn');
    });
  });
  describe('EVENTS', () => {
    it('should LIST be /events', () => {
      expect(URL.EVENTS.LIST).toBe('/events');
    });
  });
});
