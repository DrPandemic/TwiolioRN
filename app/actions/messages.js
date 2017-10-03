// @flow

import * as types from './types';
import { Message, PhoneNumber } from '../types';
import formatError from '../lib/errors';
import type { PhoneNumberWithContact } from '../types/Contact';

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
    error: formatError(error),
  };
}

export function sendMessage(to: string, from: string, body: string):
types.SendMessageT {
  return {
    type: types.SEND_MESSAGE,
    to,
    from,
    body,
  };
}

export function successSendMessage(message: Message):
types.SuccessSendMessageT {
  return {
    type: types.SUCCESS_SEND_MESSAGE,
    message,
  };
}

export function failSendMessage(error: any):
types.FailSendMessageT {
  return {
    type: types.FAIL_SEND_MESSAGE,
    error: formatError(error),
  };
}

export function startNewConversation(
  sender: PhoneNumber,
  recipient: PhoneNumberWithContact,
): types.StartNewConversationT {
  return {
    type: types.START_NEW_CONVERSATION,
    sender,
    recipient,
  };
}
