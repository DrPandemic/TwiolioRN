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

export type ActionT =
  | FetchAccountNumbersT
  | SuccessFetchAccountNumbersT
  | FailFetchAccountNumbersT
  | SelectNumberT
  | SelectConversationT
  | FetchMessagesT
  | SuccessFetchMessagesT
  | FailFetchMessagesT;
