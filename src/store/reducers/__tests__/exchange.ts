import reducer, { initState } from '../exchange';
import { ActionType } from '../../../actions/ActionTypes';
import { IAction } from '../../../types';

describe('Exchange reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as IAction)).toMatchSnapshot();
  });

  it('should handle SOURCE_CURRENCY_CHANGE', () => {
    expect(
      reducer(initState, {
        type: ActionType.SOURCE_CURRENCY_CHANGE,
        payload: {
          currency: 'EUR'
        }
      })
    ).toMatchSnapshot();
  });

  it('should handle TARGET_CURRENCY_CHANGE', () => {
    expect(
      reducer(initState, {
        type: ActionType.TARGET_CURRENCY_CHANGE,
        payload: {
          currency: 'USD'
        }
      })
    ).toMatchSnapshot();
  });
});
