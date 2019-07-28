import React, { lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import WaitComponent from 'components/Wrappers/WaitComponent';

const EventListPage = lazy(() => import('pages/EventListPage'));

const Router = () => (
  <BrowserRouter>
    <Route path="/" exact component={WaitComponent(EventListPage)} />
  </BrowserRouter>
);

export default Router;
