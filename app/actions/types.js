// @flow

import { PhoneNumber, Message } from '../types';

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
;
