import { ActionType } from '../../actions';
import { IAction, TCurrency } from '../../types';

export type TRates = {
  [key in TCurrency]?: {
    [key in TCurrency]: number;
  };
};

export const initState = {};

function rates(state: TRates = initState, action: IAction): TRates {
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
