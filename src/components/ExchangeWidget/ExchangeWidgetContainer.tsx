import { connect } from 'react-redux';

import { IStoreState } from '../../store';
import updateRates from '../../actions/updateRates';
import { TCurrency, TDispatch } from '../../types';
import exchange from '../../actions/exchange';
import ExchangeWidget from './ExchangeWidget';
import formStateHOC from './formStateHOC/formStateHOC';

const mapStateToProps = ({ pockets, rates }: IStoreState) => ({
  pockets,
  rates
});

const mapDispatchToProps = (dispatch: TDispatch) => ({
  onExchange: (
    sourceCurrency: TCurrency,
    sourceAmount: number,
    targetCurrency: TCurrency,
    targetAmount: number
  ) => {
    dispatch(
      exchange(sourceCurrency, sourceAmount, targetCurrency, targetAmount)
    );
  },
  updateRates: (baseCurrency: TCurrency) => dispatch(updateRates(baseCurrency))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(formStateHOC()(ExchangeWidget));
