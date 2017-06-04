import { reducer, initialState } from '../account';
import * as actions from '../../actions/account';

test('selectNumber selecting a number', () => {
  const state = { ...initialState, selectedNumber: 'foo' };
  const s = Symbol('number');

  const result = reducer(state, actions.selectNumber(s));

  expect(result).toEqual({ ...initialState, selectedNumber: s });
});

test('selectNumber selecting null', () => {
  const state = { ...initialState, selectedNumber: 'foo' };

  const result = reducer(state, actions.selectNumber(null));

  expect(result).toEqual({ ...initialState, selectedNumber: null });
});
