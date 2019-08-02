import React from 'react';
import LoginForm from './LoginForm';
import { Grid, Container } from '@material-ui/core';
import Title from 'components/Title';
import('./LoginPage.scss');

const LoginPage = ({ history }) => {
  return (
    <Grid
      className="loginpage"
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Container maxWidth="sm">
        <Grid container direction="column" justify="center" alignItems="center">
          <Title title="Barbecue Schedule" classes="loginpage__title"></Title>
          <LoginForm history={history}></LoginForm>
        </Grid>
      </Container>
    </Grid>
  );
};

export default LoginPage;
