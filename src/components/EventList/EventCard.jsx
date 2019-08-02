import React from 'react';
import CardWrapper from 'components/Wrappers/CardWrapper';
import PropTypes from 'prop-types';
import { PeopleOutline, MonetizationOn } from '@material-ui/icons';
import('./EventCard.scss');

const EventCard = ({ id, date, title, confirmedPeople, sum, triggerClick }) => (
  <CardWrapper
    content={
      <div className="eventcard__container" onClick={() => triggerClick(id)}>
        <div className="eventcard__primary-info-container">
          <div className="eventcard__date">{date}</div>
          <div className="eventcard__title">{title}</div>
        </div>

        <div className="eventcard__secundary-info-container">
          <div className="eventcard__confirmedPeople">
            <PeopleOutline color="secondary" />
            <span>{confirmedPeople}</span>
          </div>
          <div className="eventcard__sum">
            <MonetizationOn color="secondary" />
            <span>{sum}</span>
          </div>
        </div>
      </div>
    }
  ></CardWrapper>
);

EventCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  confirmedPeople: PropTypes.number,
  sum: PropTypes.number
};

export default EventCard;
