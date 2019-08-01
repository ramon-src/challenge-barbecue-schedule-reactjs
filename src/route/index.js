import React, { lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import WaitComponent from 'components/Wrappers/WaitComponent';
import PrivateRoute from 'route/PrivateRoute';
import URL from 'route/URL';

const EventListPage = lazy(() => import('pages/EventListPage/EventListPage'));
const LoginPage = lazy(() => import('pages/Login/LoginPage'));

const Router = () => (
  <BrowserRouter>
    <Route path={URL.AUTH.LOGIN} exact component={WaitComponent(LoginPage)} />
    <PrivateRoute
      path={URL.EVENTS.LIST}
      exact
      component={WaitComponent(EventListPage)}
    />
  </BrowserRouter>
);

export default Router;
