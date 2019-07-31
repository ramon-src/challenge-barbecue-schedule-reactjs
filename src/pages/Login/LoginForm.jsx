import React, { useState } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import CardWrapper from 'components/Wrappers/CardWrapper';

const LoginForm = ({ triggerLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    triggerLogin({ email, password });
  };
  return (
    <CardWrapper
      content={
        <div className="loginform__container">
          <Typography gutterBottom variant="h5" component="h2">
            Make a Barbecue, with us!
          </Typography>

          <Grid container justify="space-around">
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

          <Grid container justify="space-around">
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
        </div>
      }
      actions={
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button onClick={signIn} color="primary">
            Sign In!
          </Button>
        </Grid>
      }
    ></CardWrapper>
  );
};

export default LoginForm;
