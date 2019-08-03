import { ActionType } from './index';
import { FieldType, TCurrency, TDispatch } from '../types';
import { IStoreState } from '../store';
import updateRates from './updateRates';
import { DEFAULT_CURRENCY_ORDER } from '../constants/common';

function getNextCurrency(currency: TCurrency): TCurrency {
  return DEFAULT_CURRENCY_ORDER[
    (DEFAULT_CURRENCY_ORDER.indexOf(currency) + 1) %
      DEFAULT_CURRENCY_ORDER.length
  ];
}

export default function changeCurrency(type: FieldType, currency: TCurrency) {
  return (dispatch: TDispatch, getState: () => IStoreState) => {
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

    // if currencies are same we need to change one of them
    if (oppositeCurrency === currency) {
      dispatch({
        type:
          type === FieldType.Source
            ? ActionType.TARGET_CURRENCY_CHANGE
            : ActionType.SOURCE_CURRENCY_CHANGE,
        payload: { currency: getNextCurrency(oppositeCurrency) }
      });
    }
  };
}
