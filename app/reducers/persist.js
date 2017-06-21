// @flow

import { loop, Effects } from 'redux-loop';
import * as types from '../actions/types';
import createReducer from '../lib/createReducer';
import effects from '../effects';

export type T = {|
  lastPersist: ?Date,
|};
export const initialState: T = {
  lastPersist: null,
};

export const reducer = createReducer({
  [types.PERSIST_STORE]() {
    return loop(
      { lastPersist: new Date() },
      Effects.promise(effects.persistStore)
    );
  },
});
