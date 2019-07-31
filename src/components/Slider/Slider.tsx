import React, { PureComponent } from 'react';
import SlickSlider from 'react-slick';
import styled from '@emotion/styled';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick-theme.css';
import noop from '../../utils/noop';

export const Slide = styled.div`
  outline: none !important;
`;

interface ISliderProps {
  onSlide: (index: number) => void;
  currentSlide: number;
  speed: number;
}

class Slider extends PureComponent<ISliderProps> {
  static defaultProps = {
    onSlide: noop,
    currentSlide: 0,
    speed: 250
  };

  private slider?: SlickSlider;
  private scrollBlock?: Element | null;

  componentDidUpdate(prevProps: ISliderProps) {
    const { currentSlide } = this.props;

    // slider API is too tricky, there is no other possibility to change slide
    if (this.props.currentSlide !== prevProps.currentSlide) {
      this.slider && this.slider.slickGoTo(currentSlide);
    }
  }

  refSlider = (el: SlickSlider) => {
    this.slider = el;
  };

  refScrollBlock = (el: Element | null) => {
    if (el) {
      this.scrollBlock = el.querySelector('.slick-list');
    }
  };

  handleChange = (i: number): void => {
    if (this.scrollBlock) {
      // fix the bug with shifted scroll position by reason of focusing on the input
      this.scrollBlock.scrollLeft = 0;
    }

    this.props.onSlide(i);
  };

  render() {
    const { currentSlide, children, speed } = this.props;

    return (
      <div ref={this.refScrollBlock}>
        <SlickSlider
          ref={this.refSlider}
          dots
          arrows
          speed={speed}
          initialSlide={currentSlide}
          infinite={false}
          afterChange={this.handleChange}
        >
          {React.Children.map(children, (child: React.ReactNode) => (
            <Slide>{child}</Slide>
          ))}
        </SlickSlider>
      </div>
    );
  }
}

export default Slider;
