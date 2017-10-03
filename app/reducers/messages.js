// @flow

import { loop, Cmd } from 'redux-loop';
import equal from 'deep-equal';

import * as types from '../actions/types';
import {
  addMessages,
  addEmptyConversation,
  addMessage,
  restore,
} from '../types/ConversationStore';
import { getApi } from '../lib/api';
import createReducer from '../lib/createReducer';
import effects from '../effects';
import * as messageActions from '../actions/messages';
import { persistStore } from '../actions/persist';
import Message from '../types/Message';
import type { ConversationStoreT } from '../types/ConversationStore';
import type { StateT } from './';

export type T = {|
  loading: boolean,
  sending: boolean,
  messages: ConversationStoreT,
  error: any,
  sendingError: any,
  lastFetch: ?Date,
|};
export const initialState: T = {
  loading: false,
  sending: false,
  messages: {},
  error: null,
  sendingError: null,
  lastFetch: null,
};

export const reducer = createReducer({
  [types.TICK](state: T) {
    return loop(
      { ...state },
      Cmd.action(messageActions.fetchMessages()),
    );
  },
  [types.FETCH_MESSAGES](state: T) {
    return loop(
      { ...state, loading: true },
      Cmd.run(effects.fetchMessages, {
        successActionCreator: messageActions.successFetchMessages,
        failActionCreator: messageActions.failFetchMessages,
        args: [getApi(), state.lastFetch],
      }));
  },
  [types.SET_FETCHED_MESSAGES](
    state: T,
    action: types.SuccessFetchMessagesT
  ) {
    return loop(
      {
        ...state,
        messages: addMessages(state.messages, action.fetchedMessages),
        error: null,
        loading: false,
        lastFetch: Message.FindMostRecentDateSent(action.fetchedMessages),
      },
      Cmd.action(persistStore())
    );
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
    const messages = equal(action.state, {}) ?
      initialState.messages :
      restore(action.state.messages.messages);
    const lastFetch = action.state.messages ?
      new Date(action.state.messages.lastFetch) :
      initialState.lastFetch;
    return {
      ...initialState,
      ...state.messages,
      lastFetch,
      messages,
    };
  },

  [types.SEND_MESSAGE](
    state: StateT,
    { to, from, body }: types.SendMessageT,
  ) {
    return loop(
      { ...state, sending: true },
      Cmd.run(effects.sendMessage, {
        successActionCreator: messageActions.successSendMessage,
        failActionCreator: messageActions.failSendMessage,
        args: [getApi(), to, from, body],
      }));
  },
  [types.SUCCESS_SEND_MESSAGE](
    state: T,
    action: types.SuccessSendMessageT,
  ) {
    return loop(
      {
        ...state,
        messages: addMessage(state.messages, action.message),
        sendingError: null,
        sending: false,
      },
      Cmd.action(persistStore())
    );
  },
  [types.FAIL_SEND_MESSAGE](
    state: T,
    action: types.FailSendMessageT,
  ) {
    return {
      ...state,
      sendingError: action.error,
      sending: false,
    };
  },

  [types.START_NEW_CONVERSATION](
    state: StateT,
    { sender, recipient }: types.StartNewConversationT,
  ) {
    return {
      ...state,
      messages: addEmptyConversation(state.messages, {
        us: sender.number,
        other: recipient.phoneNumber,
      }),
    };
  },
});
