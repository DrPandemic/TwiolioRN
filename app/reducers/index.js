// @flow

import { combineReducers } from 'redux-loop';
import { routerReducer } from 'react-router-redux';

import * as fetchedAccountNumbersReducers from './fetchedAccountNumbers';
import * as accountReducers from './account';
import * as messageReducers from './messages';

export const reducer = combineReducers({
  fetchedAccountNumbers: fetchedAccountNumbersReducers.reducer,
  account: accountReducers.reducer,
  messages: messageReducers.reducer,
  router: routerReducer,
});

export type StateT = {|
  fetchedAccountNumbers: fetchedAccountNumbersReducers.T,
  account: accountReducers.T,
  messages: messageReducers.T,
  router: any,
|};

export const initialState: StateT = {
  fetchedAccountNumbers: fetchedAccountNumbersReducers.initialState,
  account: accountReducers.initialState,
  messages: messageReducers.initialState,
  router: {},
};
