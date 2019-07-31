import React from 'react';
import ExchangeBlock, { BlockType } from './Block/Block';
import { TCurrency, IFieldCallback } from '../../types';
import { Content, ErrorString } from './ExchangeWidget.style';
import { TPockets } from '../../store';
import formatMoney from '../../utils/formatMoney';
import ExchnageButton from './SubmitButton/SubmitButton';

interface IWidgetProps {
  pockets: TPockets;
  rate?: number;
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  sourceAmount?: number;
  targetAmount?: number;
  valid: boolean;
  errorMsg?: string;

  onCurrencyChange: IFieldCallback;
  onAmountChange?: IFieldCallback;
  onExchange: () => void;
  updateRates: () => void;
}

class ExchangeWidget extends React.PureComponent<IWidgetProps> {
  render() {
    const {
      pockets,
      sourceCurrency,
      targetCurrency,
      sourceAmount,
      targetAmount,
      rate,
      onCurrencyChange,
      onAmountChange,
      onExchange,
      valid,
      errorMsg
    } = this.props;

    return (
      <div>
        <Content>
          <ExchangeBlock
            currencyFieldName={'sourceCurrency'}
            valueFieldName={'sourceAmount'}
            type={BlockType.Source}
            pockets={pockets}
            currency={sourceCurrency}
            inputValue={sourceAmount}
            onCurrencyChange={onCurrencyChange}
            onAmountChange={onAmountChange}
          />
          <ExchangeBlock
            currencyFieldName={'targetCurrency'}
            valueFieldName={'targetAmount'}
            type={BlockType.Target}
            pockets={pockets}
            currency={targetCurrency}
            inputValue={targetAmount}
            onCurrencyChange={onCurrencyChange}
            onAmountChange={onAmountChange}
            extraContent={
              !!rate &&
              `${formatMoney(1, targetCurrency)} = ${formatMoney(
                1 / rate,
                sourceCurrency
              )}`
            }
          />
        </Content>

        <ExchnageButton disabled={!valid} onClick={onExchange}>
          Exchange
        </ExchnageButton>
        <ErrorString>{errorMsg}</ErrorString>
      </div>
    );
  }
}

export default ExchangeWidget;
