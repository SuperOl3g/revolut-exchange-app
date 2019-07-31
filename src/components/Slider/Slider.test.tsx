import React from 'react';
import { mount } from 'enzyme';
import Slider from './Slider';

describe('SubmitButton', () => {
  it('should render correct number of slides', () => {
    const wrapper: any = mount(
      <Slider>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </Slider>
    );

    expect(wrapper.find('.slick-slide').length).toBe(6);
  });
});
