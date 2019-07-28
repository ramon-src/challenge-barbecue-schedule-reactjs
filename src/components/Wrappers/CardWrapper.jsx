import React from 'react';
import { Card, CardActions, CardContent } from '@material-ui/core';

const CardWrapper = ({ content, actions }) => (
  <Card>
    {content ? <CardContent>{content}</CardContent> : ''}
    {actions ? <CardActions>{actions}</CardActions> : ''}
  </Card>
);

export default CardWrapper;
