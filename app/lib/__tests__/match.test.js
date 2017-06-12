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

test('function matchers', () => {
  // default
  expect(match([1, 2, 3], 42, [e => e.length === 4, 'foo'])).toEqual(42);
  // in matcher && single element
  expect(match([1, 2, 3], 'foo', [e => e.length === 3, 42])).toEqual(42);
  // in matcher && multiple elements
  expect(match([1, 2, 3], 'foo',
               [e => e[0] === 0, 'foo'],
               [e => e.length === 3, 42])
  ).toEqual(42);
  // in matcher && multiple elements && not last
  expect(match([1, 2, 3], 'foo',
               [e => e.length === 3, 42],
               [e => e[0] === 0, 'foo'])
  ).toEqual(42);
  // in matcher && multiple elements && non function matcher
  expect(match([1, 2, 3], 'foo',
               [e => e.length === 4, 'foo'],
               [e => e[0] === 0, 'foo'],
               [[1, 2, 3], 42])
  ).toEqual(42);
});
