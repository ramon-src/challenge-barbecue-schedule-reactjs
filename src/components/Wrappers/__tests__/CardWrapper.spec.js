import React from 'react';
import { render } from 'enzyme';
import CardWrapper from '../CardWrapper';
import { CardActions, CardContent } from '@material-ui/core';

describe('CardWrapper', () => {
  it('should render props', () => {
    const cardWrapper = render(
      <CardWrapper
        content={<div className="test-content">foo</div>}
        actions={<div className="test-actions">bar</div>}
      />
    );
    expect(cardWrapper.find('.test-content').text()).toBe('foo');
    expect(cardWrapper.find('.test-actions').text()).toBe('bar');
  });
  it('should not render action container when has no action props', () => {
    const cardWrapper = render(
      <CardWrapper content={<div className="test-content">foo</div>} />
    );
    expect(cardWrapper.find('.test-content').text()).toBe('foo');
    expect(cardWrapper.find(<CardActions />).length).toBe(0);
  });
  it('should not render content container when has no content props', () => {
    const cardWrapper = render(
      <CardWrapper actions={<div className="test-actions">bar</div>} />
    );
    expect(cardWrapper.find(<CardContent />).length).toBe(0);
    expect(cardWrapper.find('.test-actions').text()).toBe('bar');
  });
});
