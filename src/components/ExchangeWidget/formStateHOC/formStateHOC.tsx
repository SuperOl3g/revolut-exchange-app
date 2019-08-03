import React, { Component } from 'react';
import { FieldType, IFieldCallback, TCurrency } from '../../../types';
import memoize from 'memoizee';
import { TPockets } from '../../../store/reducers/pockets';
import { TRates } from '../../../store/reducers/rates';
import path from '../../../utils/path';
import { getNextCurrency } from './utils';

const UPDATE_INTERVAL = 10000;

type AmountFieldName = 'sourceAmount' | 'targetAmount';

const getOppositeFieldName = (name: AmountFieldName): AmountFieldName =>
  name === 'targetAmount' ? 'sourceAmount' : 'targetAmount';

export interface IFormStateHOCProps {
  pockets: TPockets;
  rates: TRates;
  onExchange: (
    sourceCurrency: TCurrency,
    sourceAmount: number,
    targetCurrency: TCurrency,
    targetAmount: number
  ) => void;
  updateRates: (baseCurrency: TCurrency) => void;
}

export interface IFormState {
  sourceAmount?: number | null;
  targetAmount?: number | null;
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  lastUpdatedField?: AmountFieldName;
}

const defaultState: IFormState = {
  sourceCurrency: 'RUB',
  targetCurrency: 'EUR'
};

const formStateHOC = (initialState: IFormState = defaultState) => (
  WrappedComponent: React.ComponentType<any>
) => {
  class FormStateHOC extends Component<IFormStateHOCProps, IFormState> {
    static displayName = `FormStateHOC(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    state: IFormState = initialState;

    private updateTimer?: number;

    componentDidMount() {
      this.props.updateRates(this.state.sourceCurrency);
      this.updateTimer = window.setInterval(
        () => this.props.updateRates(this.state.sourceCurrency),
        UPDATE_INTERVAL
      );
    }

    componentWillUnmount() {
      clearInterval(this.updateTimer);
    }

    componentDidUpdate(prevProps: IFormStateHOCProps) {
      const { lastUpdatedField } = this.state;

      if (this.props.rates !== prevProps.rates && lastUpdatedField) {
        this.calcAmount(getOppositeFieldName(lastUpdatedField));
      }
    }

    handleCurrencyChange = (type: FieldType, currency: TCurrency) => {
      const name =
        type === FieldType.Source ? 'sourceCurrency' : 'targetCurrency';
      const oppositeName =
        type === FieldType.Source ? 'targetCurrency' : 'sourceCurrency';

      const prevCurrency = this.state[name];

      this.setState<never>({
        [name]: currency
      });

      this.props.updateRates(currency);

      const oppositeCurrency = this.state[oppositeName];

      // if currencies are same we need to change one of them
      if (oppositeCurrency === currency) {
        this.setState<never>({
          [oppositeName]: getNextCurrency(oppositeCurrency, prevCurrency)
        });
      }
    };

    handleAmountChange: IFieldCallback = (e, { value, name }) => {
      if (!name) {
        return;
      }

      this.setState<never>(
        {
          [name]: value.length ? +value : undefined,
          lastUpdatedField: name as AmountFieldName
        },
        () => {
          this.calcAmount(getOppositeFieldName(name as AmountFieldName));
        }
      );
    };

    calcAmount(fieldName: AmountFieldName) {
      const { rates } = this.props;
      const { sourceCurrency, targetCurrency } = this.state;
      const oppositeVal = this.state[getOppositeFieldName(fieldName)];

      const rate = path(rates, [sourceCurrency, targetCurrency]);
      let val;

      if (!rate || !oppositeVal) {
        val = null;
      } else {
        let realRate = fieldName === 'sourceAmount' ? 1 / rate : rate;

        val = Math.round(oppositeVal * realRate * 100) / 100;
      }

      this.setState<never>({
        [fieldName]: val
      });
    }

    handleSubmit = () => {
      const {
        sourceCurrency,
        targetCurrency,
        sourceAmount,
        targetAmount
      } = this.state;

      this.props.onExchange(
        sourceCurrency,
        sourceAmount || 0,
        targetCurrency,
        targetAmount || 0
      );

      this.setState({
        sourceAmount: null,
        targetAmount: null
      });
    };

    validate = memoize(
      (
        sourceCurrency: TCurrency,
        pockets: TPockets,
        sourceAmount?: number | null,
        targetAmount?: number | null
      ): { valid: boolean; errorMsg?: string } => {
        if (!sourceAmount || !targetAmount) {
          return { valid: false };
        }
        if (sourceAmount > pockets[sourceCurrency]) {
          return {
            valid: false,
            errorMsg: 'Not enough money'
          };
        }

        return { valid: true };
      },
      { max: 1 }
    );

    render() {
      const { pockets } = this.props;
      const { sourceCurrency, sourceAmount, targetAmount } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          {...this.validate(
            sourceCurrency,
            pockets,
            sourceAmount,
            targetAmount
          )}
          sourceAmount={this.state.sourceAmount}
          targetAmount={this.state.targetAmount}
          sourceCurrency={this.state.sourceCurrency}
          targetCurrency={this.state.targetCurrency}
          onAmountChange={this.handleAmountChange}
          onCurrencyChange={this.handleCurrencyChange}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  return FormStateHOC;
};

export default formStateHOC;
