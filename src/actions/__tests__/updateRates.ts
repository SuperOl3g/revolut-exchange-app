import fetchMock from 'fetch-mock';
import { ActionType } from '../index';
import { EXCHANGE_API } from '../../constants/common';
import { mockStore } from '../../testUtils/';
import updateRates from '../updateRates';

describe('updateRates', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch all actions with correct data', async () => {
    const rates = {
      RUB: 1,
      EUR: 0.0141689219,
      USD: 0.0156382391,
      GBP: 0.0129149723
    };

    const store = mockStore();

    fetchMock.getOnce(`${EXCHANGE_API}/latest?base=RUB`, {
      body: { rates }
    });

    await store.dispatch(updateRates('RUB'));

    const actions = store.getActions();

    expect(actions[0].type).toBe(ActionType.RATES_REQUEST);
    expect(actions[0].payload).toStrictEqual({ baseCurrency: 'RUB' });

    expect(actions[1].type).toBe(ActionType.RATES_REQUEST_SUCCESS);
    expect(actions[1].payload).toStrictEqual({ rates, baseCurrency: 'RUB' });
  });

  it('should pick only necessary props', async () => {
    const rates = {
      RUB: 1,
      EUR: 0.0141689219,
      USD: 0.0156382391,
      GBP: 0.0129149723,
      CAD: 100500
    };

    const store = mockStore();

    fetchMock.getOnce(`${EXCHANGE_API}/latest?base=RUB`, {
      body: { rates }
    });

    await store.dispatch(updateRates('RUB'));

    const actions = store.getActions();

    expect(actions[1].type).toBe(ActionType.RATES_REQUEST_SUCCESS);
    expect(actions[1].payload).not.toStrictEqual({
      rates,
      baseCurrency: 'RUB'
    });
  });

  it('should trigger alert on error', async () => {
    const store = mockStore();

    fetchMock.getOnce(`${EXCHANGE_API}/latest?base=RUB`, {
      throws: new Error()
    });

    await store.dispatch(updateRates('RUB'));

    const actions = store.getActions();

    expect(actions[1].type).toBe(ActionType.RATES_REQUEST_FAILURE);
    expect(actions[2].type).toBe(ActionType.ALERT_ADD);
  });
});
