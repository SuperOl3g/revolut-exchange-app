import formatMoney from './formatMoney';

describe('formatMoney', () => {
  it('should work with rubles', () => {
    expect(formatMoney(3, 'RUB')).toEqual('₽3');
  });

  it('should work with dollars', () => {
    expect(formatMoney(3, 'USD')).toEqual('$3');
  });

  it('should work with euros', () => {
    expect(formatMoney(3, 'EUR')).toEqual('€3');
  });

  it('should work with pounds', () => {
    expect(formatMoney(3, 'GBP')).toEqual('£3');
  });

  it('should place comma every three decimal places', () => {
    expect(formatMoney(123456789.98, 'GBP')).toEqual('£123,456,789.98');
  });

  it('should round down', () => {
    expect(formatMoney(1.46, 'GBP', { fractions: 'none' })).toEqual('£1');
  });

  it('should round up', () => {
    expect(formatMoney(499.9999999997, 'GBP')).toEqual('£500');
  });

  it('should round up (2)', () => {
    expect(formatMoney(499.88899999997, 'GBP')).toEqual('£499.89');
  });

  it('should round up (3)', () => {
    expect(formatMoney(1.5, 'GBP', { fractions: 'none' })).toEqual('£2');
  });

  it('should keep as it is, if it is needed', () => {
    expect(formatMoney(1.5, 'GBP', { fractions: 'as-is' })).toEqual('£1.5');
  });

  it('should add zeros to fraction part', () => {
    expect(formatMoney(1.5, 'GBP', { fractions: 'always' })).toEqual('£1.50');
  });

  it('should add zeros to fraction part (2)', () => {
    expect(formatMoney(1, 'GBP', { fractions: 'always' })).toEqual('£1.00');
  });
});
