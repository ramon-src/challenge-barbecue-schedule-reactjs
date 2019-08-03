import React from 'react';
import { render } from 'enzyme';
import EventCard from '../EventCard';
import moment from 'moment';

describe('EventCard', () => {
  const fixture = {
    id: '132',
    title: "Ramon's Birthday",
    date: new Date(),
    confirmedPeople: []
  };
  it('should render props', () => {
    const eventCard = render(<EventCard event={fixture} />);
    expect(eventCard.find('.eventcard__date').text()).toBe(
      moment(new Date()).format('DD/MM hh:mm')
    );
    expect(eventCard.find('.eventcard__title').text()).toBe("Ramon's Birthday");
    expect(eventCard.find('.eventcard__confirmedPeople').text()).toBe('0');
    expect(eventCard.find('.eventcard__sum').text()).toBe('0');
  });
});
