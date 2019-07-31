import React, { PureComponent } from 'react';
import SlickSlider from 'react-slick';
import styled from '@emotion/styled';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick-theme.css';

export const Slide = styled.div`
  outline: none !important;
`;

interface ISliderProps {
  onSlide?: (index: number) => void;
  currentSlide: number;
}

class Slider extends PureComponent<ISliderProps> {
  private slider?: SlickSlider;

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

  render() {
    const { onSlide, currentSlide, children } = this.props;

    return (
      <SlickSlider
        ref={this.refSlider}
        dots
        arrows
        speed={250}
        initialSlide={currentSlide}
        infinite={false}
        afterChange={onSlide}
      >
        {React.Children.map(children, (child: React.ReactNode) => (
          <Slide>{child}</Slide>
        ))}
      </SlickSlider>
    );
  }
}

export default Slider;
