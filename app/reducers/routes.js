// @flow

import createReducer from '../lib/createReducer';

export type T = {|
  scene: any
|};
export const initialState: T = {
  scene: {},
};

export const reducer = createReducer({
  [""](state: T, action: any) {
    return {
      ...state,
      scene: action.scene,
    };
  },
});
