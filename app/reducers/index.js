// @flow

import { combineReducers } from 'redux-loop';
import { routerReducer } from 'react-router-redux';

import * as fetchedAccountNumbersReducers from './fetchedAccountNumbers';
import * as accountReducers from './account';
import * as messageReducers from './messages';
import * as persistReducers from './persist';

export const reducer = combineReducers({
  fetchedAccountNumbers: fetchedAccountNumbersReducers.reducer,
  account: accountReducers.reducer,
  messages: messageReducers.reducer,
  router: routerReducer,
  /* persist: persistReducers.reducer,*/
});

export type StateT = {|
  fetchedAccountNumbers: fetchedAccountNumbersReducers.T,
  account: accountReducers.T,
  messages: messageReducers.T,
  router: any,
                      /* persist: persistReducers.T,*/
|};

export const initialState: StateT = {
  fetchedAccountNumbers: fetchedAccountNumbersReducers.initialState,
  account: accountReducers.initialState,
  messages: messageReducers.initialState,
  router: {},
  /* persist: persistReducers.initialState,*/
};
