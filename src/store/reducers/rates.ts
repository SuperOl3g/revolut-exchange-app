import { IAction } from '../../types';
import { ActionType } from '../../actions/ActionTypes';
import { TRates } from '../index';

function rates(state: TRates = {}, action: IAction) {
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
