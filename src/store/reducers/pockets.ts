import { IAction, TCurrency } from '../../types';
import { TPockets } from '../index';
import { ActionType } from '../../actions/ActionTypes';

const initState: TPockets = {
  RUB: 1000500.34,
  USD: 800.7,
  EUR: 600,
  GBP: 70.5
};

function pockets(state: TPockets = initState, action: IAction) {
  switch (action.type) {
    case ActionType.EXCHANGE: {
      const {
        sourceCurrency,
        sourceAmount,
        targetCurrency,
        targetAmount
      } = action.payload;

      return {
        ...state,
        [sourceCurrency]: state[sourceCurrency as TCurrency] - sourceAmount,
        [targetCurrency]: state[targetCurrency as TCurrency] + targetAmount
      };
    }

    default:
      return state;
  }
}

export default pockets;
