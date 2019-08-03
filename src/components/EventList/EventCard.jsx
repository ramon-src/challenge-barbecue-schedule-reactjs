import React from 'react';
import CardWrapper from 'components/Wrappers/CardWrapper';
import PropTypes from 'prop-types';
import { PeopleOutline, MonetizationOn } from '@material-ui/icons';
import moment from 'moment';
import('./EventCard.scss');

const EventCard = ({ event, triggerClick }) => {
  const { id = '', date = '', title = '', confirmedPeople = [] } = event;

  function sum() {
    if (confirmedPeople.length === 0) return 0;
    return confirmedPeople.reduce(
      (total, confirmed) => total + confirmed.contributionValue,
      0
    );
  }

  return (
    <CardWrapper
      content={
        <div className="eventcard__container" onClick={() => triggerClick(id)}>
          <div className="eventcard__primary-info-container">
            <div className="eventcard__date">
              {moment(date).format('DD/MM hh:mm')}
            </div>
            <div className="eventcard__title">{title}</div>
          </div>

          <div className="eventcard__secundary-info-container">
            <div className="eventcard__confirmedPeople">
              <PeopleOutline color="secondary" />
              <span>{confirmedPeople.length}</span>
            </div>
            <div className="eventcard__sum">
              <MonetizationOn color="secondary" />
              <span>{sum()}</span>
            </div>
          </div>
        </div>
      }
    ></CardWrapper>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  confirmedPeople: PropTypes.array
};

export default EventCard;
