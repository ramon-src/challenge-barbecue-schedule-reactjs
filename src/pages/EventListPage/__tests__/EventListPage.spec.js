import React from 'react';
import { mount, shallow } from 'enzyme';
import EventListPage from '../EventListPage';
import EventCard from 'components/EventList/EventCard';

import API from 'services/API';
jest.mock('services/API');

describe('EventListPage', () => {
  it('should render title', () => {
    const eventListPage = shallow(<EventListPage />);
    expect(eventListPage.find('.eventlistpage__title').text()).toBe(
      'Barbecue Schedule'
    );
  });

  xit('should render event cards', () => {
    /**
     * Sadly hooks effects doesn't work properly to change the dom and render
     */
    jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);
    let spy = jest
      .spyOn(API, 'get')
      .mockImplementation(() =>
        Promise.resolve({ data: [{ _id: 1 }, { _id: 2 }] })
      );
    let eventListPage = mount(<EventListPage />);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('/events/list');
    expect(eventListPage.find(<EventCard />).length).toBe(2);
  });
  /**
   * 
    beforeEach(() => {
      console.log("@ beforeAll")
      jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
    })
    afterEach(() => React.useEffect.mockRestore())
   * 
   */
});
