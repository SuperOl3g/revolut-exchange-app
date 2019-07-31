import path from './path';

describe('path', () => {
  it('returns object by path', () => {
    expect(path({ a: { b: 2 } }, ['a', 'b'])).toEqual(2);
  });

  it('returns undefined with uncorrect path', () => {
    expect(path({ c: { b: 2 } }, ['a', 'b'])).toEqual(undefined);
  });
});
