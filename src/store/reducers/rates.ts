import { IAction } from '../../types';
import { ActionType } from '../../actions/ActionTypes';
import { TRates } from '../index';

export const initState = {};

function rates(state: TRates = initState, action: IAction) {
  switch (action.type) {
    case ActionType.RATES_REQUEST_SUCCESS: {
      const { rates, baseCurrency } = action.payload;

      return {
        ...state,
        [baseCurrency]: rates
      };
    }
    default:
      return state;
  }
}

export default rates;
