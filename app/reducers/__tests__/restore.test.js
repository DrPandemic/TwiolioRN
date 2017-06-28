// @flow

import { Effects, loop } from 'redux-loop';

jest.mock('../../store');
jest.mock('redux-persist', () => ({
  getStoredState: 'getStoredState',
}));

import { reducer, initialState } from '../restore';
import effects from '../../effects';
import * as actions from '../../actions/persist';

test('RESTORE_STORE', () => {
  const state = { ...initialState };

  const result = reducer(state, actions.restoreStore());

  expect(result).toEqual(loop(
    { ...initialState },
    Effects.promise(effects.restoreStore, 'getStoredState')
  ));
});

test('SUCCESS_RESTORE_STORE', () => {
  const state = {
    ...initialState,
    error: Symbol('error'),
  };

  const result = reducer(state, actions.successRestoreStore());

  expect(result).toEqual({ ...initialState, error: null });
});

test('FAIL_RESTORE_STORE', () => {
  const state = { ...initialState };
  const s = Symbol('error');

  const result = reducer(state, actions.failRestoreStore(s));

  expect(result).toEqual({ ...initialState, error: s });
});

test('success followed by an error', () => {
  let state = { ...initialState };
  const e = Symbol('error');

  state = reducer(state, actions.successRestoreStore());
  state = reducer(state, actions.failRestoreStore(e));

  expect(state.error).toBe(e);
});
