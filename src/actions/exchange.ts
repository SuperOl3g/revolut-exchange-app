import { TCurrency } from '../types';
import { Dispatch } from 'redux';
import { ActionType } from './ActionTypes';

export default function exchange(
  sourceCurrency: TCurrency,
  sourceAmount: number,
  targetCurrency: TCurrency,
  targetAmount: number
) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.EXCHANGE,
      payload: {
        sourceCurrency,
        sourceAmount,
        targetCurrency,
        targetAmount
      }
    });
  };
}
