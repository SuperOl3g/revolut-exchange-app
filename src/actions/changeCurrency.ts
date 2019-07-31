import { ActionType } from './ActionTypes';
import { TCurrency } from '../types';
import updateRates from './updateRates';
import { Dispatch } from '../store';
import { FieldType } from '../components/ExchangeWidget/ExchangeWidgetContainer';

export default function changeCurrency(type: FieldType, currency: TCurrency) {
  return (dispatch: Dispatch) => {
    dispatch({
      type:
        type === 'source'
          ? ActionType.SOURCE_CURRENCY_CHANGE
          : ActionType.TARGET_CURRENCY_CHANGE,
      payload: { currency }
    });

    dispatch(updateRates());
  };
}
