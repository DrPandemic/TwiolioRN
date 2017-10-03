// @flow

import { PhoneNumber, Message, Contact } from '../types';
import type { PhoneNumberWithContact } from '../types/Contact';

export const SET_FETCHED_ACCOUNT_NUMBERS = 'SET_FETCHED_ACCOUNT_NUMBERS';
export const FETCH_ACCOUNT_NUMBERS = 'FETCH_ACCOUNT_NUMBERS';
export const FETCH_ACCOUNT_NUMBER_ERROR = 'FETCH_ACCOUNT_NUMBER_ERROR';

export const SELECT_NUMBER = 'SELECT_NUMBER';
export const SELECT_CONVERSATION = 'SELECT_CONVERSATION';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const SET_FETCHED_MESSAGES = 'SET_FETCHED_MESSAGES';
export const FETCH_MESSAGE_ERROR = 'FETCH_MESSAGE_ERROR';

export const PERSIST_STORE = 'PERSIST_STORE';
export const SUCCESS_PERSIST_STORE = 'SUCCESS_PERSIST_STORE';
export const FAIL_PERSIST_STORE = 'FAIL_PERSIST_STORE';
export const RESTORE_STORE = 'RESTORE_STORE';
export const SUCCESS_RESTORE_STORE = 'SUCCESS_RESTORE_STORE';
export const FAIL_RESTORE_STORE = 'FAIL_RESTORE_STORE';

export const SCHEDULE_TICK = 'SCHEDULE_TICK';
export const TICK = 'TICK';
export const FAIL_SCHEDULE_TICK = 'FAIL_SCHEDULE_TICK';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SUCCESS_SEND_MESSAGE = 'SUCCESS_SEND_MESSAGE';
export const FAIL_SEND_MESSAGE = 'FAIL_SEND_MESSAGE';

export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const SUCCESS_FETCH_CONTACTS = 'SUCCESS_FETCH_CONTACTS';
export const FAIL_FETCH_CONTACTS = 'FAIL_FETCH_CONTACTS';

export const START_NEW_CONVERSATION = 'START_NEW_CONVERSATION';

export type FetchAccountNumbersT = {|
  type: 'FETCH_ACCOUNT_NUMBERS',
|}
export type SuccessFetchAccountNumbersT = {|
  type: 'SET_FETCHED_ACCOUNT_NUMBERS',
  fetchedAccountNumbers: Array<PhoneNumber>,
|}
export type FailFetchAccountNumbersT = {|
  type: 'FETCH_ACCOUNT_NUMBER_ERROR',
  error: any,
|}

export type SelectNumberT = {|
  type: 'SELECT_NUMBER',
  selectedNumber: ?string,
|}

export type FetchMessagesT = {|
  type: 'FETCH_MESSAGES',
|}
export type SuccessFetchMessagesT = {|
  type: 'SET_FETCHED_MESSAGES',
  fetchedMessages: Array<Message>,
|}
export type FailFetchMessagesT = {|
  type: 'FETCH_MESSAGE_ERROR',
  error: any,
|}

export type PersistStoreT = {|
  type: 'PERSIST_STORE',
|}
export type SuccessPersistStoreT = {|
  type: 'SUCCESS_PERSIST_STORE',
|}
export type FailPersistStoreT = {|
  type: 'FAIL_PERSIST_STORE',
  error: any,
|}
export type RestoreStoreT = {|
  type: 'RESTORE_STORE',
|}
export type SuccessRestoreStoreT = {|
  type: 'SUCCESS_RESTORE_STORE',
  state: any,
|}
export type FailRestoreStoreT = {|
  type: 'FAIL_RESTORE_STORE',
  error: any,
|}

export type ScheduleTickT = {|
  type: 'SCHEDULE_TICK',
|}
export type TickT = {|
  type: 'TICK',
|}
export type FailScheduleTickT = {|
  type: 'FAIL_SCHEDULE_TICK',
  error: any,
|}

export type SendMessageT = {|
  type: 'SEND_MESSAGE',
  to: string,
  from: string,
  body: string,
|}
export type SuccessSendMessageT = {|
  type: 'SUCCESS_SEND_MESSAGE',
  message: Message,
|}
export type FailSendMessageT = {|
  type: 'FAIL_SEND_MESSAGE',
  error: any,
|}

export type FetchContactsT = {|
  type: 'FETCH_CONTACTS',
|}
export type SuccessFetchContactsT = {|
  type: 'SUCCESS_FETCH_CONTACTS',
  contacts: Array<Contact>,
|}
export type FailFetchContactsT = {|
  type: 'FAIL_FETCH_CONTACTS',
  error: any,
|}

export type StartNewConversationT = {|
  type: 'START_NEW_CONVERSATION',
  sender: PhoneNumber,
  recipient: PhoneNumberWithContact,
|}

export type ActionT =
  | FetchAccountNumbersT
  | SuccessFetchAccountNumbersT
  | FailFetchAccountNumbersT
  | SelectNumberT
  | FetchMessagesT
  | SuccessFetchMessagesT
  | FailFetchMessagesT
  | PersistStoreT
  | SuccessPersistStoreT
  | FailPersistStoreT
  | RestoreStoreT
  | SuccessRestoreStoreT
  | FailRestoreStoreT
  | ScheduleTickT
  | TickT
  | FailScheduleTickT
  | SendMessageT
  | SuccessSendMessageT
  | FailSendMessageT
  | FetchContactsT
  | SuccessFetchContactsT
  | FailFetchContactsT
  | StartNewConversationT
;
