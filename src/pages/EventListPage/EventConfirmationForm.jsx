import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Slide,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  useMediaQuery,
  useTheme,
  List
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import API from 'services/API';
import ConfirmationItem from 'components/EventList/EventConfirmation/EventConfirmationItem';

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(2)
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EventConfirmationForm = ({
  triggerConfirmClose,
  triggerConfirmSave,
  open,
  id,
  contributions
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [contributionValue, setContributionValue] = useState('');

  async function save() {
    try {
      const resp = await API.post('/events/confirm', {
        id
      });
      // triggerConfirmSave(true);
    } catch (e) {
      console.error(e);
      // triggerConfirmSave(false)
    }
  }

  const [confirmedPeople, setConfirmedPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await API.get('/events/confirmedPeople');
      setConfirmedPeople(resp.data);
    };
    fetchData();
  }, []);

  const handleToggleConfirm = item => () => {
    const currentIndex = confirmedPeople.indexOf(item);
    const newConfirmed = [...confirmedPeople];

    if (currentIndex === -1) {
      newConfirmed.push(item);
    } else {
      newConfirmed.splice(currentIndex, 1);
    }
    setConfirmedPeople(newConfirmed);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={triggerConfirmClose}
      fullScreen={fullScreen}
    >
      <DialogTitle id="alert-dialog-slide-title">
        {'Shut up and take...'}
      </DialogTitle>
      <DialogContent>
        <Grid container item xs={12}>
          <Grid container spacing={2}>
            <List dense component="div" role="list">
              {confirmedPeople.map(user => {
                return (
                  <ConfirmationItem
                    checked={confirmedPeople.indexOf(user) !== -1}
                    item={user}
                    triggerConfirm={handleToggleConfirm}
                  ></ConfirmationItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
        <Grid container justify="space-around">
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="adornment-amount">Contribute!</InputLabel>
            <Input
              required
              id="adornment-amount"
              value={contributionValue}
              placeholder={`${contributions.contribution} or ${contributions.contributionWithDrink} with you drink`}
              onChange={e => setContributionValue(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={triggerConfirmClose}>Cancel</Button>
        <Button onClick={save} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventConfirmationForm;
