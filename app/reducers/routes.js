// @flow

import { ActionConst, ActionMap } from 'react-native-router-flux';
import createReducer from '../lib/createReducer';

export type T = {|
  scene: any
|};
export const initialState: T = {
  scene: {},
};

export const reducer = createReducer({
  [ActionConst.FOCUS](state: T, action: ActionMap) {
    return {
      ...state,
      scene: action.scene,
    };
  },
});
