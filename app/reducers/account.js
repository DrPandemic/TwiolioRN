import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const fetchedAccountNumbers = createReducer([], {
  [types.SET_FETCHED_ACCOUNT_NUMBERS] (state, action) {
    return action.fetchedAccountNumbers;
  },
});

