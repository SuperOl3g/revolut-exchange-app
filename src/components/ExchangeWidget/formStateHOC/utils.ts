import { TCurrency } from '../../../types';
import { DEFAULT_CURRENCY_ORDER as currencyOrder } from '../../../constants/common';

export function getNextCurrency(
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
