import { ActionType } from './ActionTypes';
import { TCurrency } from '../types';
import { Dispatch, IStoreState } from '../store';
import { getNextCurrency } from '../store/reducers/selectors';
import { FieldType } from '../components/ExchangeWidget/WidgetBlock/WidgetBlock';
import updateRates from './updateRates';

export default function changeCurrency(type: FieldType, currency: TCurrency) {
  return (dispatch: Dispatch, getState: () => IStoreState) => {
    dispatch({
      type:
        type === FieldType.Source
          ? ActionType.SOURCE_CURRENCY_CHANGE
          : ActionType.TARGET_CURRENCY_CHANGE,
      payload: { currency }
    });

    dispatch(updateRates());

    const state = getState();
    const oppositeCurrency =
      state.exchange[
        type === FieldType.Source ? 'targetCurrency' : 'sourceCurrency'
      ];

    if (oppositeCurrency === currency) {
      dispatch({
        type:
          type === FieldType.Source
            ? ActionType.TARGET_CURRENCY_CHANGE
            : ActionType.SOURCE_CURRENCY_CHANGE,
        payload: { currency: getNextCurrency(state, oppositeCurrency) }
      });
    }
  };
}
