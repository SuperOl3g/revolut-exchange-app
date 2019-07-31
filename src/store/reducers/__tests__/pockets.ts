import reducer, { initState } from '../pockets';
import { ActionType } from '../../../actions/ActionTypes';
import { IAction } from '../../../types';

describe('Pockets reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as IAction)).toMatchSnapshot();
  });

  it('should handle EXCHANGE', () => {
    expect(
      reducer(initState, {
        type: ActionType.EXCHANGE,
        payload: {
          sourceCurrency: 'USD',
          sourceAmount: 200,
          targetCurrency: 'EUR',
          targetAmount: 250
        }
      })
    ).toMatchSnapshot();
  });
});
