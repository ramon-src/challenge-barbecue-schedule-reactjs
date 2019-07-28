import React from 'react';
import { mount, shallow } from 'enzyme';
import EventListPage from '../EventListPage';
import EventCard from 'components/EventList/EventCard';

describe('EventListPage', () => {
  it('should render title', () => {
    const eventListPage = shallow(<EventListPage />);
    expect(eventListPage.find('.eventlistpage__title').text()).toBe(
      'Barbecue Schedule'
    );
  });

  it('should render event cards', () => {
    const eventListPage = mount(<EventListPage />);
    setTimeout(() => {
      eventListPage.update();
      expect(eventListPage.find(<EventCard />).length).toBe(5);
    });
  });
});
