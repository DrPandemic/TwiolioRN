import {
  selectNumber,
} from '../account';
import * as types from '../types';

test('selectNumber', () => {
  const s = Symbol('number');
  expect(selectNumber(s)).toEqual({
    type: types.SELECT_NUMBER,
    selectedNumber: s,
  });
});
