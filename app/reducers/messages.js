// @flow

import { loop, Effects } from 'redux-loop';

import * as types from '../actions/types';
import type { ConversationStoreT } from '../types/ConversationStore';
import { addMessages } from '../types/ConversationStore';
import LibApi from '../lib/api';
import createReducer from '../lib/createReducer';
import effects from '../effects';

export type T = {|
  loading: boolean,
  messages: ConversationStoreT,
  error: any,
|};
export const initialState: T = {
  loading: false,
  messages: {},
  error: {},
};

export const reducer = createReducer({
  [types.FETCH_MESSAGES](state: T) {
    return loop(
      { ...state, loading: true },
      Effects.promise(effects.fetchMessages, LibApi)
    );
  },
  [types.SET_FETCHED_MESSAGES](
    state: T,
    action: types.SuccessFetchMessagesT
  ) {
    return {
      ...state,
      messages: addMessages(state.messages, action.fetchedMessages),
      error: {},
      loading: false,
    };
  },
  [types.FETCH_MESSAGE_ERROR](
    state: T,
    action: types.FailFetchMessagesT
  ) {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  },
});
