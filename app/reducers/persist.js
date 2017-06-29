// @flow

import { loop, Effects } from 'redux-loop';
import { persistStore, getStoredState } from 'redux-persist';

import * as types from '../actions/types';
import * as actions from '../actions/persist';
import createReducer from '../lib/createReducer';
import effects from '../effects';
import type { StateT } from './';

export type T = {|
  lastPersist: ?Date,
  persistError: any,
  restoreError: any,
|};
export const initialState: T = {
  lastPersist: null,
  persistError: null,
  restoreError: null,
};

export const reducer = createReducer({
  [types.PERSIST_STORE](state: T) {
    return loop(
      { ...state },
      Effects.promise(effects.persistStore, persistStore)
    );
  },
  [types.SUCCESS_PERSIST_STORE](state: T) {
    return {
      ...state,
      lastPersist: new Date(),
      persistError: null,
    };
  },
  [types.FAIL_PERSIST_STORE](
    state: T,
    action: types.FailPersistStoreT,
  ) {
    return {
      ...state,
      persistError: action.error,
    };
  },
  [types.RESTORE_STORE](state: StateT) {
    return loop(
      { ...state },
      Effects.promise(effects.restoreStore, getStoredState)
    );
  },
  [types.SUCCESS_RESTORE_STORE](
    state: StateT,
  ) {
    return loop(
      { ...state, restoreError: null },
      Effects.constant(actions.tick())
    );
  },
  [types.FAIL_RESTORE_STORE](
    state: StateT,
    action: types.FailRestoreStoreT,
  ) {
    return {
      ...state,
      restoreError: action.error,
    };
  },
  // This could have its own reducer
  [types.SCHEDULE_TICK](
    state: StateT,
  ) {
    return loop(
      { ...state },
      Effects.promise(effects.scheduleTick)
    );
  },
  [types.TICK](
    state: StateT,
  ) {
    return loop(
      { ...state },
      Effects.constant(actions.scheduleTick())
    );
  },
});
