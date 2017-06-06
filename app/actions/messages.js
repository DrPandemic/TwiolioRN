// @flow

import * as types from './types';
import { Message } from '../types';

export function fetchMessages(): types.FetchMessagesT {
  return {
    type: types.FETCH_MESSAGES,
  };
}

export function successFetchMessages(messages: Array<Message>):
types.SuccessFetchMessagesT {
  return {
    type: types.SET_FETCHED_MESSAGES,
    fetchedMessages: messages,
  };
}

export function failFetchMessages(error: any):
types.FailFetchMessagesT {
  return {
    type: types.FETCH_MESSAGE_ERROR,
    error,
  };
}
