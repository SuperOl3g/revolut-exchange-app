import { IStoreState } from '../index';
import { TCurrency } from '../../types';

export function getNextCurrency(
  state: IStoreState,
  currency: TCurrency
): TCurrency {
  const keys = Object.keys(state.pockets) as Array<TCurrency>;

  return keys[keys.indexOf(currency) + 1];
}
