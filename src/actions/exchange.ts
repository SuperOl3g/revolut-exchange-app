import { IAction, TCurrency } from '../types';
import { ActionType } from './index';

export default function exchange(
  sourceCurrency: TCurrency,
  sourceAmount: number,
  targetCurrency: TCurrency,
  targetAmount: number
): IAction {
  return {
    type: ActionType.POCKETS_EXCHANGE,
    payload: {
      sourceCurrency,
      sourceAmount,
      targetCurrency,
      targetAmount
    }
  };
}
