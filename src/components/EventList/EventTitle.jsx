import React from 'react';
import { Grid } from '@material-ui/core';

const EventTitle = ({ title, classes }) => {
  return (
    <Grid container item xs={12} direction="row" justify="center">
      <div className={classes}>{title}</div>
    </Grid>
  );
};

export default EventTitle;
