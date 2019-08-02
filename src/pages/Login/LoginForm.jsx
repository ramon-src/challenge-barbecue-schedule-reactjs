import React, { useState } from 'react';
import { Grid, TextField, Fab } from '@material-ui/core';
import API from 'services/API';
import { useDispatch } from 'redux-react-hook';
import { addUser, removeUser } from 'store/actions';
import AuthService from 'services/Auth';
import URL from 'route/URL';
import('pages/Login/LoginForm.scss');

const LoginForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const signIn = async function() {
    try {
      const { data } = await API.post(URL.AUTH.SIGN_IN, { email, password });
      AuthService.register(data);
      dispatch(addUser(data));
      history.push(URL.EVENTS.LIST);
    } catch (e) {
      console.error(e);
      dispatch(removeUser());
    }
  };

  return (
    <Grid container className="loginform">
      <Grid container item justify="space-around">
        <TextField
          id="loginform__email-input"
          label="Email"
          placeholder="Type somethinglike@gmail.com"
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid container item justify="space-around">
        <TextField
          id="loginform__password-input"
          label="Password"
          type="password"
          placeholder="Don't let anyone see!!!"
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid container item justify="space-around">
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          className="loginform__signin-btn"
          onClick={signIn}
        >
          Sign In!
        </Fab>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
