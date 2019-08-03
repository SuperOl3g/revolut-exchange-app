import React from 'react';
import ExchangeBlock from './WidgetBlock/WidgetBlock';
import { TCurrency, IFieldCallback, FieldType } from '../../types';
import { Content, ErrorString } from './ExchangeWidget.style';
import formatMoney from '../../utils/formatMoney';
import ExchnageButton from './SubmitButton/SubmitButton';
import { TPockets } from '../../store/reducers/pockets';
import path from '../../utils/path';
import { TRates } from '../../store/reducers/rates';

interface IWidgetProps {
  pockets: TPockets;
  rates?: TRates;
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  sourceAmount?: number | null;
  targetAmount?: number | null;
  valid: boolean;
  errorMsg?: string;

  onCurrencyChange: (type: FieldType, value: TCurrency) => void;
  onAmountChange?: IFieldCallback;
  onSubmit: () => void;
}

class ExchangeWidget extends React.PureComponent<IWidgetProps> {
  render() {
    const {
      pockets,
      sourceCurrency,
      targetCurrency,
      sourceAmount,
      targetAmount,
      rates,
      onCurrencyChange,
      onAmountChange,
      onSubmit,
      valid,
      errorMsg
    } = this.props;

    const rate = path(rates, [sourceCurrency, targetCurrency]);

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

        <ExchnageButton disabled={!valid} onClick={onSubmit}>
          Exchange
        </ExchnageButton>
        <ErrorString>{errorMsg}</ErrorString>
      </div>
    );
  }
}

export default ExchangeWidget;
