import React from 'react';
import { render } from 'enzyme';
import CardWrapper from '../CardWrapper';

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
});
