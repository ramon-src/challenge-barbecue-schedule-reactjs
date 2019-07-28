import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
const EventCard = lazy(() => import('components/EventList/EventCard'));

let EventListData = [
  {
    id: 1,
    title: 'Aniver do Gui',
    date: '01/12',
    confirmedPeople: 15,
    sum: 280
  },
  {
    id: 2,
    title: 'Final de ano',
    date: '23/12',
    confirmedPeople: 28,
    sum: 400
  },
  { id: 3, title: 'Sem motivo', date: '06/01', confirmedPeople: 12, sum: 140 },
  { id: 4, title: 'Sem motivo', date: '06/01', confirmedPeople: 12, sum: 140 },
  { id: 5, title: 'Sem motivo', date: '06/01', confirmedPeople: 12, sum: 140 }
];

const EventListPage = () => {
  const [eventList, setEventList] = useState(EventListData);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Promise.resolve(EventListData);
      setEventList(result);
    };
    fetchData();
  }, [eventList]);

  return (
    <div>
      <Grid container>
        <Grid container item xs={12} direction="row" justify="center">
          <div className="eventlistpage__title">Barbecue Schedule</div>
        </Grid>

        <Grid container item xs={12}>
          <Grid container spacing={2}>
            {eventList.length > 0 ? (
              eventList.map(event => (
                <Grid item key={event.id} xs={6} md={4} lg={3}>
                  <Suspense maxDuration={1000} fallback={<CircularProgress />}>
                    <EventCard
                      title={event.title}
                      date={event.date}
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
      </Grid>
    </div>
  );
};
export default EventListPage;
