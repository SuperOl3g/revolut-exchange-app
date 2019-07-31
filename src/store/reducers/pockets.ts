import { IAction } from '../../types';
import { TPockets } from '../index';
// import {ActionType} from "../actions/ActionType";

const initState: TPockets = {
  RUB: 1000500.34,
  USD: 800.7,
  EUR: 600,
  GBP: 70.5
};

function pockets(state: TPockets = initState, action: IAction) {
  switch (action.type) {
    // case ActionType.RATES_REQUEST_SUCCESS: {

    // }

    default:
      return state;
  }
}

export default pockets;
