// @flow

import { loop, Effects } from 'redux-loop';
import { getStoredState } from 'redux-persist';

import * as types from '../actions/types';
import createReducer from '../lib/createReducer';
import effects from '../effects';
import type { StateT } from './';

export type T = {|
  error: any,
|};
export const initialState: T = {
  error: null,
};

export const reducer = createReducer({
  [types.RESTORE_STORE](state: StateT) {
    return loop(
      { ...state },
      Effects.promise(effects.restoreStore, getStoredState)
    );
  },
  [types.SUCCESS_RESTORE_STORE](
    state: StateT,
  ) {
    return {
      ...state,
      error: null,
    };
  },
  [types.FAIL_RESTORE_STORE](
    state: StateT,
    action: types.FailRestoreStoreT,
  ) {
    return {
      ...state,
      error: action.error,
    };
  },
});
