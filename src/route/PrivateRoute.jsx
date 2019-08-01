import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from 'services/Auth';

const PrivateRoute = ({ component: Comp, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() ? <Comp {...props} /> : <Redirect to="/" />
    }
  />
);

export default PrivateRoute;
