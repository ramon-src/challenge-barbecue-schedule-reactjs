import React, { Fragment } from 'react';
import CardWrapper from 'components/Wrappers/CardWrapper';
import PropTypes from 'prop-types';

const EventCard = ({ date, title, confirmedPeople, sum }) => (
  <CardWrapper
    content={
      <Fragment>
        <div className="eventcard__date">{date}</div>
        <div className="eventcard__title">{title}</div>
        <div className="eventcard__confirmedPeople">{confirmedPeople}</div>
        <div className="eventcard__sum">{sum}</div>
      </Fragment>
    }
  ></CardWrapper>
);

EventCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  confirmedPeople: PropTypes.number,
  sum: PropTypes.number
};

export default EventCard;
