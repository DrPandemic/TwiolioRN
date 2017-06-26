// @flow

import { loop, Effects } from 'redux-loop';
import * as types from '../actions/types';
import createReducer from '../lib/createReducer';
import effects from '../effects';

export type T = {|
  lastPersist: ?Date,
  error: any,
|};
export const initialState: T = {
  lastPersist: null,
  error: null,
};

export const reducer = createReducer({
  [types.PERSIST_STORE](state: T) {
    return loop(
      { ...state },
      Effects.promise(effects.persistStore)
    );
  },
  [types.SUCCESS_PERSIST_STORE](state: T) {
    return {
      ...state,
      lastPersist: new Date(),
      error: null,
    };
  },
  [types.FAIL_PERSIST_STORE](
    state: T,
    action: types.FailPersistStoreT,
  ) {
    return {
      ...state,
      error: action.error,
    };
  },
});
