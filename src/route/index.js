import React, { lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import WaitComponent from 'components/Wrappers/WaitComponent';

const EventListPage = lazy(() => import('pages/EventListPage/EventListPage'));
const LoginPage = lazy(() => import('pages/Login/LoginPage'));

const Router = () => (
  <BrowserRouter>
    <Route path="/" exact component={WaitComponent(LoginPage)} />
    <Route path="/events" exact component={WaitComponent(EventListPage)} />
  </BrowserRouter>
);

export default Router;
