import React from 'react';
import Router from 'route';
import { Grid } from '@material-ui/core';

const App = () => (
  <Grid
    className="App"
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
    <Router></Router>
  </Grid>
);

export default App;
