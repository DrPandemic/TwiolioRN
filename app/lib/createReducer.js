// @flow

import * as types from '../actions/types';
import type { StateT } from '../reducers';

type Handlers = {
  [string]: (StateT, types.ActionT) => any,
};

export default function createReducer(handlers: Handlers) {
  return function reducer(state: StateT, action: types.ActionT) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return { ...state };
  };
}
