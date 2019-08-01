import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Auth from 'services/Auth';
import PrivateRoute from 'route/PrivateRoute';
import Authenticated from '../__mocks__/AuthenticatedMock';

xdescribe('PrivateRoute', () => {
  describe('authenticated', () => {
    it('should render chosen component', () => {
      Auth.isAuthenticated = jest.fn(() => true);
      const wrapper = mount(
        <MemoryRouter initialEntries={['/random']}>
          <PrivateRoute component={Authenticated}></PrivateRoute>
        </MemoryRouter>
      );
      expect(wrapper.find('div')).toBe('isAuthenticated');
    });
  });

  describe('unauthorized', () => {
    it('should redirect to the base route (component)', () => {
      Auth.isAuthenticated = jest.fn(() => false);
      const wrapper = mount(
        <MemoryRouter initialEntries={['/random']}>
          <PrivateRoute component={Authenticated}></PrivateRoute>
        </MemoryRouter>
      );
      expect(wrapper).toBe('Redirect to /');
    });
  });
});
