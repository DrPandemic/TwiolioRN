// @flow

type Handlers = {
  [string]: (any, any) => any,
};

export default function createReducer(handlers: Handlers) {
  return function reducer(state: any, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return { ...state };
  };
}
