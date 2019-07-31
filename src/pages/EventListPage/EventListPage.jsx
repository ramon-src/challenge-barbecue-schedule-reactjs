import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Grid, Fab, CircularProgress } from '@material-ui/core';
import API from 'services/API'
import { Add as AddIcon } from '@material-ui/icons';
import moment from 'moment'
import('./EventListPage.scss')
const EventCard = lazy(() => import('components/EventList/EventCard'));
const EventForm = lazy(() => import('./EventForm'));


const EventListPage = () => {

  const [open, setOpen] = useState(false);
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await API.get('/events/list');  
      setEventList(resp.data);
    };
    fetchData();
  }, []);

  const addEvent = (event) => {
    setEventList(eventList.concat(event))
    handleClose()
  }
  return (
    <div className="eventlistpage">
      <Grid container>
        <Grid container item xs={12} direction="row" justify="center">
          <div className="eventlistpage__title">Barbecue Schedule</div>
        </Grid>

        <Grid container item xs={12}>
          <Grid container spacing={2}>

            {eventList.length > 0 ? (

              eventList.map(event => (
                <Grid item key={event._id} xs={6} md={4} lg={3}>
                  <Suspense maxDuration={1000} fallback={<CircularProgress />}>
                    <EventCard
                      title={event.title}
                      date={moment(event.date).format('DD/MM hh:mm')}
                      confirmedPeople={event.confirmedPeople}
                      sum={event.sum}
                    ></EventCard>
                  </Suspense>
                </Grid>
              ))

            ) : (
              <div className="eventlistpage__no-events">
                Hey, you don't have any event created.
              </div>
            )}
          </Grid>
        </Grid>
        <Fab className="eventlistpage__add-btn" aria-label="add" color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        { open ? <EventForm open={open} triggerAddEvent={addEvent} triggerClose={handleClose}></EventForm> : "" }
      </Grid>
    </div>
  );
};
export default EventListPage;
