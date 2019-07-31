import { TCurrency } from '../types';

const symbols = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

const optionsMap = {
  'as-is': {
    maximumFractionDigits: 2
  },
  always: {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  none: {
    maximumFractionDigits: 0
  }
};

const formatMoney = (
  val: number,
  currency: TCurrency,
  { fractions = 'as-is' }: { fractions?: 'as-is' | 'always' | 'none' } = {}
): string =>
  symbols[currency] + val.toLocaleString(undefined, optionsMap[fractions]);

export default formatMoney;
