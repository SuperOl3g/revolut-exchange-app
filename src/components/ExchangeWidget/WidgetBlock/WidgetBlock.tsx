import React, { PureComponent } from 'react';
import { TCurrency, IFieldCallback, FieldType } from '../../../types';
import formatMoney from '../../../utils/formatMoney';
import CurrencyInput from '../../CurrencyInput/CurrencyInput';
import {
  ExchangeBlock,
  Row,
  SecondaryText,
  Wrapper
} from './WidgetBlock.style';
import Slider from '../../Slider/Slider';
import memoize from 'memoizee';

import { DEFAULT_CURRENCY_ORDER } from '../../../constants/common';
import noop from '../../../utils/noop';
import { TPockets } from '../../../store/reducers/pockets';

interface IBlockProps {
  type: FieldType;
  currency: TCurrency;
  pockets: TPockets;
  inputValue?: number | null;
  onCurrencyChange: (type: FieldType, value: TCurrency) => void;
  onAmountChange?: IFieldCallback;
  valueFieldName: string;
  extraContent?: React.ReactNode;
}

class WigdetBlock extends PureComponent<IBlockProps> {
  static defaultProps = {
    onCurrencyChange: noop
  };

  private inputRefs: { [key in TCurrency]?: HTMLElement } = {};

  componentDidMount() {
    const { type, currency } = this.props;

    // focusing on first input after widget initialization
    if (type === FieldType.Source) {
      this.focusInput(currency);
    }
  }

  handleSlideClick = (event: React.SyntheticEvent<HTMLElement>): void => {
    this.focusInput(event.currentTarget.dataset['currency'] as TCurrency);
  };

  handleSlide = (index: number): void => {
    const { type } = this.props;

    const newCurrency = DEFAULT_CURRENCY_ORDER[index];

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
      <ExchangeBlock
        key={currency}
        data-currency={currency}
        onClick={this.handleSlideClick}
      >
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
    );
  };

  render() {
    const { currency, type } = this.props;

    return (
      <Wrapper type={type}>
        <Slider
          currentSlide={DEFAULT_CURRENCY_ORDER.indexOf(currency)}
          onSlide={this.handleSlide}
        >
          {DEFAULT_CURRENCY_ORDER.map(this.renderSlide)}
        </Slider>
      </Wrapper>
    );
  }
}
export default WigdetBlock;
