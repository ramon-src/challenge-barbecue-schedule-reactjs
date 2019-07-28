import React from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';

const CardWrapper = ({ content, actions }) => (
  <Card>
    <CardContent>{content}</CardContent>
    <CardActions>{actions}</CardActions>
  </Card>
);

export default CardWrapper;
