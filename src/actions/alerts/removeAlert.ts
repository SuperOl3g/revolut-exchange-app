import { ActionType } from '../index';
import { IAction } from '../../types';

export default function addAlert(id: string): IAction {
  return {
    type: ActionType.ALERT_REMOVE,
    payload: { id }
  };
}
