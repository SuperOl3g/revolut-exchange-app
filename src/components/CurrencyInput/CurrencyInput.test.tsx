import React from 'react';
import { mount, shallow } from 'enzyme';
import CurrencyInput from './CurrencyInput';

describe('CurrencyInput', () => {
  it('should renders value from props', () => {
    const wrapper: any = mount(<CurrencyInput value={123} prefix={'-'} />);

    expect(wrapper.find('input').instance().value).toEqual('-123');
  });

  it('should add comma every three decimal places', () => {
    const wrapper: any = mount(<CurrencyInput value={123456789.98} />);

    expect(wrapper.find('input').instance().value).toEqual('123,456,789.98');
  });

  it('should show only 2 fractions decimals', () => {
    const wrapper: any = mount(<CurrencyInput value={1.3674} />);

    expect(wrapper.find('input').instance().value).toEqual('1.37');
  });

  it('should return positive number in "onChange" cb ', () => {
    const handleChange = jest.fn();

    const wrapper: any = mount(
      <CurrencyInput prefix={'-'} onChange={handleChange} />
    );

    wrapper.simulate('change', { target: { value: '123', focus: () => {} } });
    expect(handleChange).toBeCalledWith(null, { value: '123' });
  });

  it('shouldn\'t trigger callback on prop "value" changes', () => {
    const handleChange = jest.fn();

    const wrapper: any = shallow(
      <CurrencyInput prefix={'-'} value={12345} onChange={handleChange} />
    );

    wrapper.setProps({ value: 321 });

    expect(handleChange).not.toBeCalled();
  });
});
