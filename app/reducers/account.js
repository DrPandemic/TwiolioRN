import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const accountNumbers = createReducer([], {
  [types.SET_ACCOUNT_NUMBERS] (state, action) {
    return action.accountNumbers;
  },
});

