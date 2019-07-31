import { Dispatch } from 'redux';
import { EXCHANGE_API } from '../constants/common';
import { ActionType } from './ActionTypes';
import { IStoreState } from '../store';

export default function updateRates() {
  return (dispatch: Dispatch, getState: () => IStoreState) => {
    const { sourceCurrency } = getState().exchange;

    dispatch({
      type: ActionType.RATES_REQUEST,
      payload: { baseCurrency: sourceCurrency }
    });

    return fetch(`${EXCHANGE_API}/latest?base=${sourceCurrency}`)
      .then(response => response.json())
      .then(({ rates }) => {
        const { RUB, EUR, USD, GBP } = rates;

        return { RUB, EUR, USD, GBP };
      })
      .then(rates =>
        dispatch({
          type: ActionType.RATES_REQUEST_SUCCESS,
          payload: { rates, baseCurrency: sourceCurrency }
        })
      );
  };
}
