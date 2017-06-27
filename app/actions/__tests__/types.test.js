import * as types from '../types';

test('consts are not the same', () => {
  const uniqueSet = new Set(Object.values(types));

  expect(Object.values(types)).toHaveLength(uniqueSet.size);
});
