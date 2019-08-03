import { ActionType } from '../../actions';
import { IAction, TCurrency } from '../../types';

export type TExchange = {
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
};

export const initState: TExchange = {
  sourceCurrency: 'RUB',
  targetCurrency: 'EUR'
};

function exchange(state: TExchange = initState, action: IAction): TExchange {
  switch (action.type) {
    case ActionType.SOURCE_CURRENCY_CHANGE: {
      return {
        ...state,
        sourceCurrency: action.payload.currency
      };
    }

    case ActionType.TARGET_CURRENCY_CHANGE: {
      return {
        ...state,
        targetCurrency: action.payload.currency
      };
    }

    default:
      return state;
  }
}

export default exchange;
