import { IAction, TCurrency } from '../../types';
import { ActionType } from '../../actions';

export type TPockets = {
  [key in TCurrency]: number;
};

export const initState: TPockets = {
  RUB: 1000500.34,
  USD: 800.7,
  EUR: 600,
  GBP: 70.5
};

function pockets(state: TPockets = initState, action: IAction): TPockets {
  switch (action.type) {
    case ActionType.POCKETS_EXCHANGE: {
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
