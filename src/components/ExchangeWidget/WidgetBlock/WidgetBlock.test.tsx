import React from 'react';
import { mount } from 'enzyme';
import WidgetBlock from './WidgetBlock';
import { FieldType } from '../../../types';

describe('WidgetBlock', () => {
  it('should focus after mounting', () => {
    const wrapper: any = mount(
      <WidgetBlock
        valueFieldName={'sourceAmount'}
        type={FieldType.Source}
        pockets={{
          RUB: 1000500.34,
          USD: 800.7,
          EUR: 600,
          GBP: 70.5
        }}
        currency={'RUB'}
      />
    );

    expect(
      wrapper
        .find('input')
        .at(0)
        .at(0)
        .html() === (document.activeElement as HTMLElement).outerHTML
    ).toBe(true);
  });
});
