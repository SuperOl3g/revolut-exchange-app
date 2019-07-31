import React from 'react';
import ExchangeBlock, { BlockType } from './Block/Block';
import { TCurrency, IFieldCallback } from '../../types';
import { Button, Content } from './ExchangeWidget.style';
import { TPockets } from '../../store';
import formatMoney from '../../utils/formatMoney';

export interface IWidgetProps {
  pockets: TPockets;
  rate?: number;
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  sourceAmount?: number;
  targetAmount?: number;

  onCurrencyChange: IFieldCallback;
  onAmountChange?: IFieldCallback;
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
      onAmountChange
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

        <Button disabled={!targetAmount}>Exchange</Button>
      </div>
    );
  }
}

export default ExchangeWidget;
