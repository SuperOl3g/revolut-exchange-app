import { ActionType } from '../index';
import { IAction, IAlert } from '../../types';

export default function addAlert({
  id,
  message,
  repeatable = true
}: IAlert): IAction {
  return {
    type: ActionType.ALERT_ADD,
    payload: { id, message, repeatable }
  };
}
