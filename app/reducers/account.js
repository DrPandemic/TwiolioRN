// @flow

import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export type T = {|
  selectedNumber: ?string,
  selectedConversation: ?string,
|};
export const initialState: T = {
  selectedNumber: null,
  selectedConversation: null,
};

export const reducer = createReducer({
  [types.SELECT_NUMBER](state: T, action: types.SelectNumberT) {
    return {
      ...state,
      selectedNumber: action.selectedNumber,
    };
  },
  [types.SELECT_CONVERSATION](state: T, action: types.SelectConversationT) {
    return {
      ...state,
      selectedConversation: action.selectedConversation,
    };
  },
});
