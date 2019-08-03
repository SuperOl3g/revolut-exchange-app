import reducer, { initState } from '../rates';
import { ActionType } from '../../../actions';
import { IAction } from '../../../types';

describe('Rates reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as IAction)).toMatchSnapshot();
  });

  it('should handle RATES_REQUEST_SUCCESS', () => {
    expect(
      reducer(initState, {
        type: ActionType.RATES_REQUEST_SUCCESS,
        payload: {
          rates: {
            RUB: 1,
            EUR: 0.0141689219,
            USD: 0.0156382391,
            GBP: 0.0129149723
          },
          baseCurrency: 'RUB'
        }
      })
    ).toMatchSnapshot();
  });
});
