import reducer, { initState } from '../alerts';
import { ActionType } from '../../../actions';
import { IAction } from '../../../types';

describe('Alerts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as IAction)).toMatchSnapshot();
  });

  it('should add new alert', () => {
    expect(
      reducer(initState, {
        type: ActionType.ALERT_ADD,
        payload: {
          id: 'MY_ALERT',
          message: 'Some text'
        }
      })
    ).toMatchSnapshot();
  });

  it('should renew unrepeatable alerts', () => {
    const state = {
      0: { id: 'ALERT0', message: 'text0' },
      1: { id: 'ALERT1', message: 'text1' },
      2: { id: 'ALERT2', message: 'text2' },
      3: { id: 'ALERT3', message: 'text3' }
    };

    expect(
      reducer(state, {
        type: ActionType.ALERT_ADD,
        payload: {
          id: 'ALERT2',
          message: 'Some text',
          repeatable: false
        }
      })
    ).toMatchSnapshot();
  });

  it('should remove old alert', () => {
    const state = {
      0: { id: 'ALERT0', message: 'text0' },
      1: { id: 'ALERT1', message: 'text1' },
      2: { id: 'ALERT2', message: 'text2' },
      3: { id: 'ALERT3', message: 'text3' }
    };

    expect(
      reducer(state, {
        type: ActionType.ALERT_REMOVE,
        payload: {
          id: 'ALERT1',
          message: 'Some text'
        }
      })
    ).toMatchSnapshot();
  });
});
