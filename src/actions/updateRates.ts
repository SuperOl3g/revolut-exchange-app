import { Dispatch } from 'redux';
import { EXCHANGE_API } from '../constants/common';
import { ActionType } from './index';
import { IStoreState } from '../store';
import addAlert from './alerts/addAlert';
import removeAlert from './alerts/removeAlert';

const ALERT_ID = 'UPDATE_RATES_FAILED';

let errorFlag = false;

export default function updateRates() {
  return (dispatch: Dispatch, getState: () => IStoreState) => {
    const { sourceCurrency } = getState().exchange;

    dispatch({
      type: ActionType.RATES_REQUEST,
      payload: { baseCurrency: sourceCurrency }
    });

    return fetch(`${EXCHANGE_API}/latest?base=${sourceCurrency}`)
      .then(response => response.json())
      .then(({ rates = {} }) => {
        const { RUB, EUR, USD, GBP } = rates;

        return { RUB, EUR, USD, GBP };
      })
      .then(rates => {
        if (errorFlag) {
          dispatch(removeAlert(ALERT_ID));
          errorFlag = false;
        }

        return dispatch({
          type: ActionType.RATES_REQUEST_SUCCESS,
          payload: { rates, baseCurrency: sourceCurrency }
        });
      })
      .catch(() => {
        errorFlag = true;

        dispatch({
          type: ActionType.RATES_REQUEST_FAILURE,
          payload: { baseCurrency: sourceCurrency }
        });

        dispatch(
          addAlert({
            id: ALERT_ID,
            message: 'Failed to get exchange rates',
            repeatable: false
          })
        );
      });
  };
}
