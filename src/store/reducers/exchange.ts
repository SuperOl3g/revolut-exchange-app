import { IAction } from '../../types';
import { ActionType } from '../../actions/ActionTypes';

export const initState = {
  sourceCurrency: 'RUB',
  targetCurrency: 'EUR'
};

function exchange(state = initState, action: IAction) {
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
