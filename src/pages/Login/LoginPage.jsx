import React from 'react';
import LoginForm from './LoginForm';
import('./LoginPage.scss');

const LoginPage = ({ history }) => {
  return (
    <div className="loginpage">
      <div className="loginpage__title">Barbecue Schedule</div>
      <LoginForm history={history}></LoginForm>
    </div>
  );
};

export default LoginPage;
