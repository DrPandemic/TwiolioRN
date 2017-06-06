// @flow

import match from '../match';

test('match', () => {
  // default
  expect(match(12, 42, [1, 2])).toEqual(42);
  // in matcher && single element
  expect(match(12, 'foo', [12, 42])).toEqual(42);
  // in matcher && multiple elements
  expect(match(12, 'foo', [1, 2], [12, 42])).toEqual(42);
  // in matcher && multiple elements && not last
  expect(match(12, 'foo', [1, 2], [12, 42], [13, 43])).toEqual(42);

  // Complexe objects
  // default
  expect(match({ a: 2 }, 42, [{ a: 1 }, 3])).toEqual(42);
  // in matcher && single element
  expect(match({ a: 2 }, 'foo', [{ a: 2 }, 42])).toEqual(42);
  // in matcher && multiple elements
  expect(match({ a: 2 }, 'foo', [1, 3], [{ a: 2 }, 42])).toEqual(42);
  // in matcher && multiple elements && not last
  expect(match({ a: 2 }, 'foo', [['a'], 3], [{ a: 2 }, 42], [1, 3])).toEqual(42);
});
