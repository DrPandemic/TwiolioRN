// @flow

import * as types from '../actions/types';

type Handlers = {
  [string]: (any, types.ActionT) => any,
};

export default function createReducer(handlers: Handlers) {
  return function reducer(state: any, action: types.ActionT) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return { ...state };
  };
}
