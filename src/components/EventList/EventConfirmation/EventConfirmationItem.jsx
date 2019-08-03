import React from 'react';
import {
  ListItem,
  ListItemText,
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
      <ListItemText
        className="eventconfirmation__list-item-text"
        id={item.id}
        primary={item.user.username}
      />
      <ListItemSecondaryAction>
        ${item.contributionValue}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default EventConfirmationItem;
