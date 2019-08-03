import { ActionType } from './index';
import { FieldType, TCurrency, TDispatch } from '../types';
import { IStoreState } from '../store';
import updateRates from './updateRates';
import { DEFAULT_CURRENCY_ORDER as currencyOrder } from '../constants/common';

function getNextCurrency(
  currency: TCurrency,
  prevCurrency: TCurrency
): TCurrency {
  const curIndex = currencyOrder.indexOf(currency);
  const prevIndex = currencyOrder.indexOf(prevCurrency);
  const shift = curIndex > prevIndex ? -1 : 1;

  return currencyOrder[
    (currencyOrder.length + curIndex + shift) % currencyOrder.length
  ];
}

export default function changeCurrency(type: FieldType, currency: TCurrency) {
  return (dispatch: TDispatch, getState: () => IStoreState) => {
    const state = getState();
    const prevCurrency =
      state.exchange[
        type === FieldType.Source ? 'sourceCurrency' : 'targetCurrency'
      ];

    dispatch({
      type:
        type === FieldType.Source
          ? ActionType.SOURCE_CURRENCY_CHANGE
          : ActionType.TARGET_CURRENCY_CHANGE,
      payload: { currency }
    });

    dispatch(updateRates());

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
        payload: { currency: getNextCurrency(oppositeCurrency, prevCurrency) }
      });
    }
  };
}
