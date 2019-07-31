import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExchangeWidget, { IWidgetProps } from './ExchangeWidget';
import { IStoreState } from '../../store';
import updateRates from '../../actions/updateRates';
import { IAction, IFieldCallback, TCurrency } from '../../types';
import { ThunkDispatch } from 'redux-thunk';
import changeCurrency from '../../actions/changeCurrency';
import path from '../../utils/path';

const UPDATE_INTERVAL = 10000;

export type FieldType = 'source' | 'target';

type FieldName = 'sourceAmount' | 'targetAmount';

const getOppositeFieldName = (name: FieldName): FieldName =>
  name === 'targetAmount' ? 'sourceAmount' : 'targetAmount';

interface IWidgetContainerState {
  sourceAmount?: number;
  targetAmount?: number;
  lastUpdatedField?: FieldName;
}

class ExchangeWidgetContainer extends Component<
  IWidgetProps,
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

  componentDidUpdate(prevProps: IWidgetProps) {
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

    if (!rate || !oppositeVal) {
      return;
    }

    let realRate = fieldName === 'sourceAmount' ? 1 / rate : rate;

    this.setState({
      [fieldName]: Math.round(oppositeVal * realRate * 100) / 100
    });
  }

  render() {
    return (
      <ExchangeWidget
        {...this.props}
        sourceAmount={this.state.sourceAmount}
        targetAmount={this.state.targetAmount}
        onAmountChange={this.handleAmountChange}
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
    onCurrencyChange: ((e, { value, name }) => {
      const type: FieldType = name === 'sourceCurrency' ? 'source' : 'target';
      dispatch(changeCurrency(type, value as TCurrency));
    }) as IFieldCallback,
    updateRates: () => dispatch(updateRates())
  })
)(ExchangeWidgetContainer);
