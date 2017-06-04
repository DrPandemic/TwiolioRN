// @flow

import * as types from './types';

export function fetchMessages() {
  return {
    type: types.FETCH_MESSAGES,
  };
}

export function successFetchMessages(messages: Array<types.Message>) {
  return {
    type: types.SET_FETCHED_MESSAGES,
    fetchedMessages: messages,
  };
}

export function failFetchMessages(error: any) {
  return {
    type: types.FETCH_MESSAGE_ERROR,
    error,
  };
}
