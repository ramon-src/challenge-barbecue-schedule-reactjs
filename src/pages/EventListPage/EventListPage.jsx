import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Grid, Container, Fab, CircularProgress } from '@material-ui/core';
import API from 'services/API';
import { Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import Title from 'components/Title';
import EventConfirmationForm from './EventConfirmationForm';
import EventForm from './EventForm';
import('./EventListPage.scss');
const EventCard = lazy(() => import('components/EventList/EventCard'));

const EventListPage = () => {
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [eventToBeConfirmed, setEventToBeConfirmed] = useState({});

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function confirmCanceled() {
    setOpenConfirmation(false);
  }
  // {
  //   title: "Aniversario da Sabrina",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1],
  //   sum: 20,
  //   id: "asuhduhasda",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Happy hour",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1,2,3,4],
  //   sum: 200,
  //   id: "asuhduhasda3",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Aniversario da Sabrina",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1],
  //   sum: 20,
  //   id: "asuhduhasda",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Happy hour",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1,2,3,4],
  //   sum: 200,
  //   id: "asuhduhasda3",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Aniversario da Sabrina",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1],
  //   sum: 20,
  //   id: "asuhduhasda",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Happy hour",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1,2,3,4],
  //   sum: 200,
  //   id: "asuhduhasda3",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Aniversario da Sabrina",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1],
  //   sum: 20,
  //   id: "asuhduhasda",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Happy hour",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1,2,3,4],
  //   sum: 200,
  //   id: "asuhduhasda3",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // },{
  //   title: "Aniversario da Sabrina",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1],
  //   sum: 20,
  //   id: "asuhduhasda",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda",
  // },{
  //   title: "Happy hour",
  //   date: moment(new Date()).format('DD/MM hh:mm'),
  //   confirmedPeople: [1,2,3,4],
  //   sum: 200,
  //   id: "asuhduhasda3",
  //   contribution: 10,
  //   contributionWithDrink: 15,
  //   responsible: "asuhduhasda3"
  // }

  const [eventList, setEventList] = useState([]);

  const addEvent = event => {
    setEventList(eventList.concat(event));
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await API.get('/events/list');
      setEventList(resp.data);
    };
    fetchData();
  }, []);

  function confirmSaved(isSaved) {
    setOpenConfirmation(isSaved);
  }

  function handleConfirmation(id) {
    setOpenConfirmation(true);
    let event = eventList.find(event => event.id === id);
    setEventToBeConfirmed(event);
  }

  return (
    <Container>
      <div className="eventlistpage">
        <Title title="Barbecue Schedule" classes="eventlistpage__title" />

        <Grid container item xs={12}>
          <Grid container spacing={2}>
            {eventList.length > 0 ? (
              eventList.map(event => (
                <Grid item key={event.id} xs={6} md={4} lg={3}>
                  <Suspense maxDuration={1000} fallback={<CircularProgress />}>
                    <EventCard
                      title={event.title}
                      date={moment(event.date).format('DD/MM hh:mm')}
                      confirmedPeople={event.confirmedPeople.length}
                      sum={event.sum}
                      id={event.id}
                      triggerClick={handleConfirmation}
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
        <Fab
          className="eventlistpage__add-btn"
          aria-label="add"
          color="primary"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
        {open ? (
          <EventForm
            open={open}
            triggerAddEvent={addEvent}
            triggerClose={handleClose}
          ></EventForm>
        ) : (
          ''
        )}
        {openConfirmation ? (
          <EventConfirmationForm
            open={openConfirmation}
            eventUsed={eventToBeConfirmed}
            triggerConfirmSave={confirmSaved}
            triggerConfirmClose={confirmCanceled}
          ></EventConfirmationForm>
        ) : (
          ''
        )}
      </div>
    </Container>
  );
};
export default EventListPage;
