import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction
} from '@material-ui/core';

const EventConfirmationItem = ({ checked, item, triggerConfirm }) => {
  return (
    <ListItem
      className="eventconfirmation__list-item"
      role="listitem"
      button
      onClick={triggerConfirm(item)}
    >
      <ListItemIcon className="eventconfirmation__list-item-icon">
        <Checkbox
          key={item.id}
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': item.id }}
        />
      </ListItemIcon>
      <ListItemText
        className="eventconfirmation__list-item-text"
        id={item.id}
        primary={item.username}
      />
      <ListItemSecondaryAction>$ {item.contribution}</ListItemSecondaryAction>
    </ListItem>
  );
};

export default EventConfirmationItem;
