import React, { useState, useEffect, useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import moment from 'moment';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Slide,
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  useMediaQuery,
  useTheme,
  List,
  IconButton,
  Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { PeopleOutline, MonetizationOn } from '@material-ui/icons';
import API from 'services/API';
import ConfirmationItem from 'components/EventList/EventConfirmation/EventConfirmationItem';

import './EventConfirmationForm.scss';

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EventConfirmationForm = ({
  triggerConfirmClose,
  triggerConfirmSave,
  open,
  eventUsed
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [contributionValue, setContributionValue] = useState('');

  const mapState = useCallback(state => state.user.id, []);
  const userId = useMappedState(mapState);

  async function save() {
    try {
      await API.post('/events/confirm', {
        eventId: event.id,
        userId: userId,
        contributionValue
      });
      triggerConfirmSave(true);
    } catch (e) {
      console.error(e);
      triggerConfirmSave(false);
    }
  }
  async function unsubscribe() {
    try {
      await API.post('/events/unsubscribe', {
        eventId: event.id,
        id: findUserInConfirmedList().id
      });
      triggerConfirmSave(true);
    } catch (e) {
      console.error(e);
      triggerConfirmSave(false);
    }
  }

  const [event, setEvent] = useState({ ...eventUsed });
  const [confirmedPeopleList, setConfirmedPeopleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await API.get(`/events/event/${eventUsed.id}`);
        let eventLoaded;
        let { confirmedPeople } = (eventLoaded = resp.data);
        setEvent(eventLoaded);
        setConfirmedPeopleList([...confirmedPeople]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [event.responsible, eventUsed]);

  const handleToggleConfirm = item => () => {
    const currentIndex = confirmedPeopleList.indexOf(item);
    const newConfirmed = [...confirmedPeopleList];

    if (currentIndex === -1) {
      newConfirmed.push(item);
    } else {
      newConfirmed.splice(currentIndex, 1);
    }
    setConfirmedPeopleList(newConfirmed);
  };

  function sum(confirmedPeople) {
    if (confirmedPeople.length === 0) return 0;
    return confirmedPeople.reduce(
      (total, confirmed) => total + confirmed.contributionValue,
      0
    );
  }

  function hasConfirmedPeople() {
    return event.confirmedPeople.length > 0;
  }

  function theFirstGuy() {
    return !event.confirmedPeople.find(it => it.user._id === userId);
  }

  function findUserInConfirmedList() {
    return event.confirmedPeople.find(it => it.user._id === userId);
  }
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={triggerConfirmClose}
      fullScreen={fullScreen}
      className="eventconfirmation"
    >
      <DialogTitle className="eventconfirmation__header">
        <div className="eventconfirmation__primary-info-container">
          <div className="eventconfirmation__date">
            {moment(event.date).format('DD/MM hh:mm')}
          </div>
          <div className="eventconfirmation__confirmedPeople">
            <PeopleOutline color="secondary" />
            <span>{event.confirmedPeople.length}</span>
          </div>
        </div>

        <div className="eventconfirmation__secondary-info-container">
          <div className="eventconfirmation__title">{event.title}</div>
          <div className="eventconfirmation__sum">
            <MonetizationOn color="secondary" />
            <span>{sum(event.confirmedPeople)}</span>
          </div>
        </div>
        {event.observation ? (
          <div className="eventconfirmation__terceary-info-container">
            <span>{event.observation}</span>
          </div>
        ) : (
          ''
        )}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={triggerConfirmClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {hasConfirmedPeople() ? (
        <DialogContent className="eventconfirmation__content">
          <Grid container item xs={12}>
            <Grid container spacing={2}>
              <List
                component="div"
                className="eventconfirmation__list"
                role="list"
              >
                {event.confirmedPeople.map(user => {
                  return (
                    <ConfirmationItem
                      key={user.id}
                      checked={confirmedPeopleList.indexOf(user) !== -1}
                      item={user}
                      triggerConfirm={handleToggleConfirm}
                    ></ConfirmationItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
      ) : (
        ''
      )}
      <DialogActions className="eventconfirmation__actions">
        {Boolean(theFirstGuy()) ? (
          <Grid container item xs={12}>
            <Grid container item justify="space-around">
              <FormControl
                fullWidth
                className="eventconfirmation__contribute-input"
              >
                <InputLabel htmlFor="adornment-amount">
                  {hasConfirmedPeople() ? 'Contribute!' : 'Be the first!!!'}
                </InputLabel>
                <Input
                  required
                  id="adornment-amount"
                  margin="dense"
                  value={contributionValue}
                  placeholder={`$${event.contribution} or $${event.contributionWithDrink} if you drink`}
                  onChange={e => setContributionValue(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid container item justify="space-around">
              <Fab
                variant="extended"
                size="large"
                aria-label="add"
                color="secondary"
                className="eventconfirmation__contribute-btn"
                onClick={save}
              >
                Confirm
              </Fab>
            </Grid>
          </Grid>
        ) : (
          <Grid container item xs={12}>
            <Grid container item justify="space-around">
              <Fab
                variant="extended"
                size="large"
                aria-label="unsubscribe"
                className="eventconfirmation__unsubscribe-btn"
                onClick={unsubscribe}
              >
                Unsubscribe me
              </Fab>
            </Grid>
          </Grid>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EventConfirmationForm;
