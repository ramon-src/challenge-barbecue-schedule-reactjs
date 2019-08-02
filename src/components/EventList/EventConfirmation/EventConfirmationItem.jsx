import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox
} from '@material-ui/core';

const EventConfirmationItem = ({ checked, item, triggerConfirm }) => {
  return (
    <ListItem key={item} role="listitem" button onClick={triggerConfirm(item)}>
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': item.id }}
        />
      </ListItemIcon>
      <ListItemText id={item.id} primary={item.username} />
    </ListItem>
  );
};

export default EventConfirmationItem;
