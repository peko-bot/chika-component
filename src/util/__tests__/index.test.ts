import { formatDate, getParamsFromUrl, compare, getDirection } from '..';

describe('util', () => {
  it('formatDate', () => {
    expect(formatDate('2019-03-24T00:00:00')).toBe('2019-03-24 00:00:00');
  });

  it('getParamsFromUrl', () => {
    window.location.hash = 'http://localhost:9099?test=test1';
    expect(getParamsFromUrl('test')).toBe('test1');
    window.location.hash = 'http://localhost:9099';
    expect(getParamsFromUrl('test')).toBe(null);
    expect(getParamsFromUrl('test', 'http://localhost:9099?test=test1')).toBe(
      'test1',
    );
    window.location.hash = null;
  });

  it('compare', () => {
    const arr = [{ a: 2, b: 3 }, { a: 3, b: 4 }];
    expect(arr.sort(compare('a'))).toEqual(arr);
    expect(arr.sort(compare('a', true))).toEqual([
      { a: 3, b: 4 },
      { a: 2, b: 3 },
    ]);
  });

  it('getDirection', () => {
    expect(getDirection(0, 0, 0, 0)).toBe('');
    expect(getDirection(0, 0, 100, 20)).toBe('toRight');
    expect(getDirection(-180, 200, 0, 0)).toBe('toTop');
  });
});
