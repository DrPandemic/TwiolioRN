import { combineReducers } from 'redux-loop';
import * as fetchedAccountNumbersReducers from './fetchedAccountNumbers';

export const reducer = combineReducers({
  fetchedAccountNumbers: fetchedAccountNumbersReducers.reducer,
});

export const initialState = {
  fetchedAccountNumbers: fetchedAccountNumbersReducers.initialState,
};
