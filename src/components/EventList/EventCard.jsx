import React from 'react';
import CardWrapper from 'components/Wrappers/CardWrapper';
import PropTypes from 'prop-types';
import('./EventCard.scss');

const EventCard = ({ date, title, confirmedPeople, sum }) => (
  <CardWrapper
    content={
      <div className="eventcard__container">
        <div className="eventcard__primary-info-container">
          <div className="eventcard__date">{date}</div>
          <div className="eventcard__title">{title}</div>
        </div>

        <div className="eventcard__secundary-info-container">
          <div className="eventcard__confirmedPeople">{confirmedPeople}</div>
          <div className="eventcard__sum">{sum}</div>
        </div>
      </div>
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
