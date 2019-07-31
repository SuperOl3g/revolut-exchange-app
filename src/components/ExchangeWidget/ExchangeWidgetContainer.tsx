import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExchangeWidget from './ExchangeWidget';
import { IStoreState, TPockets } from '../../store';
import updateRates from '../../actions/updateRates';
import { IAction, IFieldCallback, TCurrency } from '../../types';
import { ThunkDispatch } from 'redux-thunk';
import changeCurrency from '../../actions/changeCurrency';
import path from '../../utils/path';
import memoize from 'memoize-one';
import exchange from '../../actions/exchange';

const UPDATE_INTERVAL = 10000;

export type FieldType = 'source' | 'target';

type FieldName = 'sourceAmount' | 'targetAmount';

const getOppositeFieldName = (name: FieldName): FieldName =>
  name === 'targetAmount' ? 'sourceAmount' : 'targetAmount';

interface IWidgetContainerProps {
  pockets: TPockets;
  rate?: number;
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  sourceAmount?: number;
  targetAmount?: number;
  valid?: boolean;
  errorMsg?: string;

  onCurrencyChange: IFieldCallback;
  onAmountChange?: IFieldCallback;
  onExchange: (
    sourceCurrency: TCurrency,
    sourceAmount: number,
    targetCurrency: TCurrency,
    targetAmount: number
  ) => void;
  updateRates: () => void;
}

interface IWidgetContainerState {
  sourceAmount?: number;
  targetAmount?: number;
  lastUpdatedField?: FieldName;
}

class ExchangeWidgetContainer extends Component<
  IWidgetContainerProps,
  IWidgetContainerState
> {
  private updateTimer?: number;

  state: IWidgetContainerState = {};

  componentDidMount() {
    this.props.updateRates();
    this.updateTimer = window.setInterval(
      this.props.updateRates,
      UPDATE_INTERVAL
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  componentDidUpdate(prevProps: IWidgetContainerProps) {
    const { lastUpdatedField } = this.state;

    if (this.props.rate !== prevProps.rate && lastUpdatedField) {
      this.calcAmount(getOppositeFieldName(lastUpdatedField));
    }
  }

  handleAmountChange: IFieldCallback = (e, { value, name }) => {
    this.setState(
      {
        [name]: value.length ? +value : undefined,
        lastUpdatedField: name as FieldName
      },
      () => {
        this.calcAmount(getOppositeFieldName(name as FieldName));
      }
    );
  };

  calcAmount(fieldName: FieldName) {
    const { rate } = this.props;
    const oppositeVal = this.state[getOppositeFieldName(fieldName)];

    if (!rate) {
      return;
    }

    let realRate = fieldName === 'sourceAmount' ? 1 / rate : rate;
    const val = !oppositeVal
      ? undefined
      : Math.round(oppositeVal * realRate * 100) / 100;

    this.setState({
      [fieldName]: val
    });
  }

  handleExchange = () => {
    const { sourceAmount, targetAmount } = this.state;
    const { sourceCurrency, targetCurrency } = this.props;

    this.props.onExchange(
      sourceCurrency,
      sourceAmount || 0,
      targetCurrency,
      targetAmount || 0
    );
  };

  validate = memoize(
    (
      sourceCurrency: TCurrency,
      pockets: TPockets,
      sourceAmount: number | undefined,
      targetAmount: number | undefined
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
    }
  );

  render() {
    const { sourceCurrency, pockets } = this.props;
    const { sourceAmount, targetAmount } = this.state;

    return (
      <ExchangeWidget
        {...this.props}
        {...this.validate(sourceCurrency, pockets, sourceAmount, targetAmount)}
        sourceAmount={this.state.sourceAmount}
        targetAmount={this.state.targetAmount}
        onAmountChange={this.handleAmountChange}
        onExchange={this.handleExchange}
      />
    );
  }
}

export default connect(
  (state: IStoreState) => {
    const { pockets, exchange } = state;

    return {
      pockets,
      rate: path(state, [
        'rates',
        exchange.sourceCurrency,
        exchange.targetCurrency
      ]),
      sourceCurrency: exchange.sourceCurrency,
      targetCurrency: exchange.targetCurrency
    };
  },
  (dispatch: ThunkDispatch<IStoreState, any, IAction>) => ({
    onExchange: (
      sourceCurrency: TCurrency,
      sourceAmount: number,
      targetCurrency: TCurrency,
      targetAmount: number
    ) =>
      dispatch(
        exchange(sourceCurrency, sourceAmount, targetCurrency, targetAmount)
      ),
    onCurrencyChange: ((e, { value, name }) => {
      const type: FieldType = name === 'sourceCurrency' ? 'source' : 'target';
      dispatch(changeCurrency(type, value as TCurrency));
    }) as IFieldCallback,
    updateRates: () => dispatch(updateRates())
  })
)(ExchangeWidgetContainer);
