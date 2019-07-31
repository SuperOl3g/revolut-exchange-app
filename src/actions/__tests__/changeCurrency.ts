import changeCurrency from '../changeCurrency';
import { ActionType } from '../ActionTypes';
import { mockStore } from '../../testUtils/';
import { FieldType } from '../../types';

describe('changeCurrency', () => {
  it('dispatches all actions with correct data', async () => {
    const initialState: any = {
      exchange: {
        targetCurrency: 'USD'
      }
    };

    const store = mockStore(initialState);

    await store.dispatch(changeCurrency(FieldType.Source, 'RUB'));

    const actions = store.getActions();

    expect(actions[0].type).toBe(ActionType.SOURCE_CURRENCY_CHANGE);
    expect(actions[0].payload).toStrictEqual({ currency: 'RUB' });

    expect(actions[1].type).toBe(ActionType.RATES_REQUEST);
  });

  it('changes opposite field currency if values are the same', async () => {
    const initialState: any = {
      exchange: {
        targetCurrency: 'RUB'
      }
    };

    const store = mockStore(initialState);

    await store.dispatch(changeCurrency(FieldType.Source, 'RUB'));

    const actions = store.getActions();

    expect(actions[2].type).toBe(ActionType.TARGET_CURRENCY_CHANGE);
    expect(actions[2].payload).toStrictEqual({ currency: 'USD' });
  });
});
