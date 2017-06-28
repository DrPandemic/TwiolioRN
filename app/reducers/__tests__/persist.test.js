// @flow

import { Effects, loop } from 'redux-loop';

jest.mock('../../store');
jest.mock('redux-persist', () => ({
  persistStore: 'persistStore',
}));

import { reducer, initialState } from '../persist';
import effects from '../../effects';
import * as actions from '../../actions/persist';

test('PERSIST_STORE', () => {
  const state = { ...initialState };

  const result = reducer(state, actions.persistStore());

  expect(result).toEqual(loop(
    { ...initialState },
    Effects.promise(effects.persistStore, 'persistStore')
  ));
});

test('SUCCESS_PERSIST_STORE', () => {
  const persist = Symbol('persist');
  const state = {
    ...initialState,
    lastPersist: persist,
    error: Symbol('error'),
  };

  const result = reducer(state, actions.successPersistStore());

  expect(result.lastPersist).not.toBe(persist);
  expect(result.error).toBeNull();
});

test('FAIL_PERSIST_STORE', () => {
  const state = { ...initialState };
  const s = Symbol('error');

  const result = reducer(state, actions.failPersistStore(s));

  expect(result).toEqual({ ...initialState, error: s });
});

test('success followed by an error', () => {
  let state = { ...initialState };
  const e = Symbol('error');

  state = reducer(state, actions.successPersistStore());
  state = reducer(state, actions.failPersistStore(e));

  expect(state.lastPersist).not.toBeNull();
  expect(state.error).toBe(e);
});
