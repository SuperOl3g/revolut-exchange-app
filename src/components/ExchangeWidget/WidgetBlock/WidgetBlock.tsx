import React, { PureComponent } from 'react';
import { TCurrency, IFieldCallback } from '../../../types';
import formatMoney from '../../../utils/formatMoney';
import CurrencyInput from '../../CurrencyInput/CurrencyInput';
import {
  ExchangeBlock,
  Row,
  SecondaryText,
  Slide,
  Wrapper
} from './WidgetBlock.style';
import { TPockets } from '../../../store';
import Slider from 'react-slick';
import memoize from 'memoizee';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick-theme.css';

export enum FieldType {
  Source,
  Target
}

interface IBlockProps {
  type: FieldType;
  currency: TCurrency;
  pockets: TPockets;
  inputValue?: number;
  onCurrencyChange: (type: FieldType, value: TCurrency) => void;
  onAmountChange?: IFieldCallback;
  valueFieldName: string;
  extraContent?: React.ReactNode;
}

const getPocketsKeys = (pockets: TPockets): Array<TCurrency> => {
  return Object.keys(pockets) as Array<TCurrency>;
};

class WigdetBlock extends PureComponent<IBlockProps> {
  private inputRefs: { [key in TCurrency]?: HTMLElement } = {};
  private slider?: Slider;

  componentDidMount() {
    const { type, currency } = this.props;

    // focusing on first input after widget initialization
    if (type === FieldType.Source) {
      this.focusInput(currency);
    }
  }

  componentDidUpdate(prevProps: IBlockProps) {
    const { currency, pockets } = this.props;

    // slider API is to tricky, there is no other possibility to change slide
    if (this.props.currency !== prevProps.currency) {
      this.slider &&
        this.slider.slickGoTo(getPocketsKeys(pockets).indexOf(currency));
    }
  }

  handleSlideClick = (event: React.SyntheticEvent<HTMLElement>): void => {
    this.focusInput(event.currentTarget.dataset['currency'] as TCurrency);
  };

  handleSlide = (index: number): void => {
    const { pockets, type } = this.props;

    const newCurrency = getPocketsKeys(pockets)[index];

    this.props.onCurrencyChange(type, newCurrency);

    this.focusInput(newCurrency);
  };

  focusInput(currency: TCurrency): void {
    const ref = this.inputRefs[currency];

    ref && ref.focus();
  }

  setInputRef = memoize(
    (currency: TCurrency) => (ref: HTMLElement): void => {
      this.inputRefs[currency] = ref;
    },
    { primitive: true }
  );

  refSlider = (el: Slider) => {
    this.slider = el;
  };

  renderSlide = (currency: TCurrency) => {
    const {
      pockets,
      type,
      inputValue,
      onAmountChange,
      valueFieldName,
      extraContent
    } = this.props;

    return (
      <Slide
        key={currency}
        data-currency={currency}
        onClick={this.handleSlideClick}
      >
        <ExchangeBlock>
          <Row>
            <div>{currency}</div>
            <CurrencyInput
              getRef={this.setInputRef(currency)}
              prefix={type === FieldType.Source ? '-' : '+'}
              name={valueFieldName}
              value={inputValue}
              onChange={onAmountChange}
            />
          </Row>
          <Row>
            <SecondaryText>
              You have&nbsp;
              {formatMoney(pockets[currency], currency, {
                fractions: 'always'
              })}
            </SecondaryText>

            <SecondaryText>{extraContent}</SecondaryText>
          </Row>
        </ExchangeBlock>
      </Slide>
    );
  };

  render() {
    const { pockets, currency, type } = this.props;

    const pocketsKeys = getPocketsKeys(pockets);

    return (
      <Wrapper type={type}>
        <Slider
          ref={this.refSlider}
          dots
          arrows
          speed={250}
          initialSlide={pocketsKeys.indexOf(currency)}
          infinite={false}
          afterChange={this.handleSlide}
        >
          {pocketsKeys.map(this.renderSlide)}
        </Slider>
      </Wrapper>
    );
  }
}
export default WigdetBlock;
