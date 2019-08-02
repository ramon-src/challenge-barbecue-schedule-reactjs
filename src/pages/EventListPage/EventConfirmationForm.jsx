import React, { useState, useEffect, Fragment } from 'react';

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

  async function save() {
    try {
      const resp = await API.post('/events/confirm', {
        id: eventUsed.id
      });
      // triggerConfirmSave(true);
    } catch (e) {
      console.error(e);
      // triggerConfirmSave(false)
    }
  }

  const [event, setEvent] = useState({ ...eventUsed });
  const [confirmedPeopleList, setConfirmedPeopleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const resp = await API.get(`/events/${eventUsed.id}`);
      // setEvent(resp.data);
      let newEvent = { ...eventUsed };
      newEvent.confirmedPeople = [
        { username: 'Ramon Schmidt Rocha', id: '5161611', contribution: 20 },
        { username: 'Roberta', id: '5161612', contribution: 40 },
        { username: 'Mauricio', id: '5161613', contribution: 50 },
        { username: 'Roberta', id: '51616134', contribution: 50 },
        { username: 'Schmidt', id: '51616135', contribution: 50 },
        { username: 'Joao', id: '51616136', contribution: 50 },
        { username: 'Carlos', id: '51616137', contribution: 50 }
      ];
      setEvent(newEvent);
      setConfirmedPeopleList([...newEvent.confirmedPeople]);
    };
    fetchData();
  }, [eventUsed]);

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
          <div className="eventconfirmation__date">{event.date}</div>
          <div className="eventconfirmation__confirmedPeople">
            <PeopleOutline color="secondary" />
            <span>{event.confirmedPeople.length}</span>
          </div>
        </div>

        <div className="eventconfirmation__secondary-info-container">
          <div className="eventconfirmation__title">{event.title}</div>
          <div className="eventconfirmation__sum">
            <MonetizationOn color="secondary" />
            <span>{event.sum}</span>
          </div>
        </div>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={triggerConfirmClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

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
      <DialogActions>
        {Boolean(event.responsible) ? (
          <Grid container item xs={12}>
            <Grid container item justify="space-around">
              <FormControl
                fullWidth
                className="eventconfirmation__contribute-input"
              >
                <InputLabel htmlFor="adornment-amount">Contribute!</InputLabel>
                <Input
                  required
                  id="adornment-amount"
                  margin="normal"
                  value={contributionValue}
                  placeholder={`${event.contribution} or ${event.contributionWithDrink} with you drink`}
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
                onClick={triggerConfirmClose}
              >
                Unsubscribe
              </Fab>
            </Grid>
          </Grid>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EventConfirmationForm;
