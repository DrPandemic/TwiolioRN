import { combineReducers } from 'redux-loop';
import * as AccountReducers from './account';

export const reducer = combineReducers({
  fetchedAccountNumbers: AccountReducers.reducer,
});

export const initialState = {
  fetchedAccountNumbers: AccountReducers.initialState,
};
