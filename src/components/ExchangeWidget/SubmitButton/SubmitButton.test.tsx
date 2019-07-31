import React from 'react';
import { mount, shallow } from 'enzyme';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('should disabled markup if "disabled" props is set', () => {
    const wrapper: any = mount(<SubmitButton disabled />);

    expect(wrapper.find('button').instance().disabled).toEqual(true);
  });

  it('should return positive number in "onChange" cb ', () => {
    const handleClick = jest.fn();

    const wrapper: any = shallow(<SubmitButton onClick={handleClick} />);

    wrapper.simulate('click');

    expect(handleClick).toBeCalled();
  });
});
