import formatMoney from '../formatMoney';

describe('formatMoney', () => {
  it('works with rubles', () => {
    expect(formatMoney(3, 'RUB')).toEqual('₽3');
  });

  it('works with dollars', () => {
    expect(formatMoney(3, 'USD')).toEqual('$3');
  });

  it('works with euros', () => {
    expect(formatMoney(3, 'EUR')).toEqual('€3');
  });

  it('works with pounds', () => {
    expect(formatMoney(3, 'GBP')).toEqual('£3');
  });

  it('places comma every three decimal places', () => {
    expect(formatMoney(123456789.98, 'GBP')).toEqual('£123,456,789.98');
  });

  it('rounds down', () => {
    expect(formatMoney(1.46, 'GBP', { fractions: 'none' })).toEqual('£1');
  });

  it('rounds up', () => {
    expect(formatMoney(499.9999999997, 'GBP')).toEqual('£500');
  });

  it('rounds up (2)', () => {
    expect(formatMoney(499.88899999997, 'GBP')).toEqual('£499.89');
  });

  it('rounds up (3)', () => {
    expect(formatMoney(1.5, 'GBP', { fractions: 'none' })).toEqual('£2');
  });

  it('keeps as it is, if it is needed', () => {
    expect(formatMoney(1.5, 'GBP', { fractions: 'as-is' })).toEqual('£1.5');
  });

  it('adds zeros to fraction part', () => {
    expect(formatMoney(1.5, 'GBP', { fractions: 'always' })).toEqual('£1.50');
  });

  it('adds zeros to fraction part (2)', () => {
    expect(formatMoney(1, 'GBP', { fractions: 'always' })).toEqual('£1.00');
  });
});
