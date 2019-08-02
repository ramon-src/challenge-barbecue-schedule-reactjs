import React, { useState, useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Slide,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import API from 'services/API';

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(2)
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EventForm = ({ open, triggerAddEvent, triggerClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [title, setTitle] = useState('');
  const [observation, setObservation] = useState('');
  const [contributionWithDrink, setContributionWithDrink] = useState('');
  const [contribution, setContribution] = useState('');

  const mapState = useCallback(state => state.user.id, []);
  const responsibleId = useMappedState(mapState);

  async function save() {
    try {
      const resp = await API.post('/events/add', {
        title,
        date: selectedDate,
        observation,
        contributionWithDrink,
        contribution,
        responsible: responsibleId
      });
      triggerAddEvent({
        id: resp.data,
        title: title,
        date: selectedDate,
        responsible: responsibleId
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={triggerClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Make a new great event!'}
        </DialogTitle>
        <DialogContent>
          <Grid container justify="space-around">
            <DatePicker
              format="DD/MM/YYYY"
              margin="normal"
              id="mui-pickers-date"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              autoOk
            ></DatePicker>
            <TimePicker
              margin="normal"
              id="mui-pickers-time"
              label="Time"
              value={selectedDate}
              onChange={handleDateChange}
              autoOk
            ></TimePicker>
          </Grid>

          <Grid container justify="space-around">
            <TextField
              required
              id="standard-required"
              label="Description"
              placeholder="Ramon's party"
              margin="normal"
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid container justify="space-around">
            <TextField
              required
              id="standard-required"
              label="Observation"
              placeholder="Can bring a friend"
              margin="normal"
              value={observation}
              onChange={e => setObservation(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid container justify="space-around">
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="adornment-amount">
                Contribution suggested with Drink
              </InputLabel>
              <Input
                required
                id="adornment-amount"
                value={contributionWithDrink}
                onChange={e => setContributionWithDrink(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="adornment-amount">Without drink</InputLabel>
              <Input
                required
                id="adornment-amount"
                value={contribution}
                onChange={e => setContribution(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={triggerClose}>Cancel</Button>
          <Button onClick={save} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default EventForm;
