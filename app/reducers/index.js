import { combineReducers } from 'redux-loop';
import * as fetchedAccountNumbersReducers from './fetchedAccountNumbers';
import * as accountReducers from './account';

export const reducer = combineReducers({
  fetchedAccountNumbers: fetchedAccountNumbersReducers.reducer,
  account: accountReducers.reducer,
});

export const initialState = {
  fetchedAccountNumbers: fetchedAccountNumbersReducers.initialState,
  account: accountReducers.initialState,
};
