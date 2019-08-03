import React from 'react';
import { mount } from 'enzyme';
import AlertsStack from './AlertsStack';

describe('AlertStack', () => {
  it('should render only 3 last alert', () => {
    const wrapper: any = mount(
      <AlertsStack
        alerts={[
          { message: 'text1' },
          { message: 'text2' },
          { message: 'text3' },
          { message: 'text4' },
          { message: 'text5' }
        ]}
      />
    );

    expect(
      wrapper
        .children()
        .children()
        .children().length
    ).toBe(3);
  });
});
