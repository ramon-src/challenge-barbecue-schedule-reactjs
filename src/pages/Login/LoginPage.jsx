import React, { Fragment } from 'react';
import LoginForm from './LoginForm';
import API from 'services/API';
import('./LoginPage.scss');

const LoginPage = () => {
  async function handleLogin({ email, password }) {
    try {
      console.log(email);
      console.log(password);
      // const resp = await API.post('/auth/signIn', { email, password });
      //set resp data to store
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Fragment>
      <div className="loginpage__title">Barbecue Schedule</div>
      <LoginForm triggerLogin={handleLogin}></LoginForm>
    </Fragment>
  );
};

export default LoginPage;
