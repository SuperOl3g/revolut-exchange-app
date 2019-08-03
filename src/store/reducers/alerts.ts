import { IAction, IAlert, TAnyObject } from '../../types';
import { ActionType } from '../../actions';

export type TAlerts = {
  [key in string]: IAlert;
};

export const initState: TAlerts = {};

const filterAlert = (state: TAlerts, alert: IAlert): TAlerts =>
  Object.keys(state).reduce((memo: TAnyObject, key: string) => {
    if (state[key].id !== alert.id) {
      memo[key] = state[key];
    }

    return memo;
  }, {});

function alerts(state: TAlerts = initState, action: IAction): TAlerts {
  const keys = Object.keys(state);
  let _inc: number = +keys[keys.length - 1] + 1 || 0;

  switch (action.type) {
    case ActionType.ALERT_ADD: {
      const { repeatable } = action.payload;

      const newState = repeatable
        ? { ...state }
        : filterAlert(state, action.payload as IAlert);

      newState[_inc++] = action.payload as IAlert;

      return newState;
    }

    case ActionType.ALERT_REMOVE: {
      return filterAlert(state, action.payload as IAlert);
    }

    default:
      return state;
  }
}

export default alerts;
