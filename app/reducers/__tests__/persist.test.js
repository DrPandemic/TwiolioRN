import { Cmd, loop } from 'redux-loop';

jest.mock('../../store');
jest.mock('redux-persist', () => ({
  persistStore: 'persistStore',
  getStoredState: 'getStoredState',
}));

import { reducer, initialState } from '../persist';
import effects from '../../effects';
import * as actions from '../../actions/persist';

test('PERSIST_STORE', () => {
  const state = { ...initialState };

  const result = reducer(state, actions.persistStore());

  expect(result).toEqual(loop(
    { ...initialState },
    Cmd.run(effects.persistStore, {
      successActionCreator: actions.successPersistStore,
      failActionCreator: actions.failPersistStore,
      args: ['persistStore'],
    })
  ));
});

test('SUCCESS_PERSIST_STORE', () => {
  const persist = Symbol('persist');
  const state = {
    ...initialState,
    lastPersist: persist,
    persistError: Symbol('error'),
  };

  const result = reducer(state, actions.successPersistStore());

  expect(result.lastPersist).not.toBe(persist);
  expect(result.persistError).toBeNull();
});

test('FAIL_PERSIST_STORE', () => {
  const state = { ...initialState };
  const s = Symbol('error');

  const result = reducer(state, actions.failPersistStore(s));

  expect(result).toEqual({ ...initialState, persistError: s });
});

test('success followed by an error', () => {
  let state = { ...initialState };
  const e = Symbol('error');

  state = reducer(state, actions.successPersistStore());
  state = reducer(state, actions.failPersistStore(e));

  expect(state.lastPersist).not.toBeNull();
  expect(state.persistError).toBe(e);
});

test('RESTORE_STORE', () => {
  const state = { ...initialState };

  const result = reducer(state, actions.restoreStore());

  expect(result).toEqual(loop(
    { ...initialState },
    Cmd.sequence([
      Cmd.run(effects.restoreStore, {
        successActionCreator: actions.successRestoreStore,
        failActionCreator: actions.failRestoreStore,
        args: ['getStoredState'],
      }),
      Cmd.action(actions.tick())
    ])
  ));
});

test('SUCCESS_RESTORE_STORE', () => {
  const state = {
    ...initialState,
    restoreError: Symbol('error'),
  };

  const result = reducer(state, actions.successRestoreStore());

  expect(result).toEqual({ ...initialState, restoreError: null });
});

test('FAIL_RESTORE_STORE', () => {
  const state = { ...initialState };
  const s = Symbol('error');

  const result = reducer(state, actions.failRestoreStore(s));

  expect(result).toEqual({ ...initialState, restoreError: s });
});

test('success followed by an error', () => {
  let state = { ...initialState };
  const e = Symbol('error');

  state = reducer(state, actions.successRestoreStore());
  state = reducer(state, actions.failRestoreStore(e));

  expect(state.restoreError).toBe(e);
});

test('SCHEDULE_TICK', () => {
  const result = reducer({ ...initialState }, actions.scheduleTick());

  expect(result).toEqual(loop(
    { ...initialState },
    Cmd.run(effects.scheduleTick, {
      successActionCreator: actions.tick,
      failActionCreator: actions.failScheduleTick,
      args: [],
    })
  ));
});

test('TICK', () => {
  const result = reducer({ ...initialState }, actions.tick());

  expect(result).toEqual(loop(
    { ...initialState },
    Cmd.action(actions.scheduleTick()),
  ));
});
