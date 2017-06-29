// @flow

import { loop, Effects } from 'redux-loop';

import * as types from '../actions/types';
import { addMessages, restore } from '../types/ConversationStore';
import LibApi from '../lib/api';
import createReducer from '../lib/createReducer';
import effects from '../effects';
import { fetchMessages } from '../actions/messages';
import type { ConversationStoreT } from '../types/ConversationStore';
import type { StateT } from './';

export type T = {|
  loading: boolean,
  messages: ConversationStoreT,
  error: any,
|};
export const initialState: T = {
  loading: false,
  messages: {},
  error: null,
};

export const reducer = createReducer({
  [types.TICK](state: T) {
    return loop(
      { ...state },
      Effects.constant(fetchMessages()),
    );
  },
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
      error: null,
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
  [types.SUCCESS_RESTORE_STORE](
    state: StateT,
    action: types.SuccessRestoreStoreT,
  ) {
    return {
      ...state.messages,
      messages: restore(action.state.messages.messages),
      error: null,
      loading: false,
    };
  },
});
