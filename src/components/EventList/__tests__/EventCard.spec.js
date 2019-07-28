import React from 'react';
import { render } from 'enzyme';
import EventCard from '../EventCard';

describe('EventCard', () => {
  const fixture = {
    title: "Ramon's Birthday",
    date: '11/02',
    confirmedPeople: 23,
    sum: 200
  };
  it('should render props', () => {
    const eventCard = render(<EventCard {...fixture} />);
    expect(eventCard.find('.eventcard__date').text()).toBe('11/02');
    expect(eventCard.find('.eventcard__title').text()).toBe("Ramon's Birthday");
    expect(eventCard.find('.eventcard__confirmedPeople').text()).toBe('23');
    expect(eventCard.find('.eventcard__sum').text()).toBe('200');
  });
});
