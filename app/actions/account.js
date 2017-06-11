// @flow

import * as types from './types';

export function selectNumber(selectedNumber: ?string)
: types.SelectNumberT {
  return {
    type: types.SELECT_NUMBER,
    selectedNumber,
  };
}

export function selectConversation(selectedConversation: ?string)
: types.SelectConversationT {
  return {
    type: types.SELECT_CONVERSATION,
    selectedConversation,
  };
}
