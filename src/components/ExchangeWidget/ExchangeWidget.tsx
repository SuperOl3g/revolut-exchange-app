import React from 'react';
import ExchangeBlock from './WidgetBlock/WidgetBlock';
import { TCurrency, IFieldCallback, FieldType } from '../../types';
import { Content, ErrorString } from './ExchangeWidget.style';
import { TPockets } from '../../store';
import formatMoney from '../../utils/formatMoney';
import ExchnageButton from './SubmitButton/SubmitButton';

interface IWidgetProps {
  pockets: TPockets;
  rate?: number;
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  sourceAmount?: number | null;
  targetAmount?: number | null;
  valid: boolean;
  errorMsg?: string;

  onCurrencyChange: (type: FieldType, value: TCurrency) => void;
  onAmountChange?: IFieldCallback;
  onExchange: () => void;
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
            valueFieldName={'sourceAmount'}
            type={FieldType.Source}
            pockets={pockets}
            currency={sourceCurrency}
            inputValue={sourceAmount}
            onCurrencyChange={onCurrencyChange}
            onAmountChange={onAmountChange}
          />
          <ExchangeBlock
            valueFieldName={'targetAmount'}
            type={FieldType.Target}
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
