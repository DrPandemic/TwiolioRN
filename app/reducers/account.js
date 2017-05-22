import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const fetchAccountNumbers = createReducer({}, {
  [types.SET_ACCOUNT_NUMBER] (state, action) {
    return {
      ...state,
      accountNumbers: action.accountNumbers,
    };
  },
});

