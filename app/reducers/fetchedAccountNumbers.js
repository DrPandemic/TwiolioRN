// @flow

import { loop, Effects } from 'redux-loop';
import * as types from '../actions/types';
import LibApi from '../lib/api';
import createReducer from '../lib/createReducer';
import { fetchNumbers } from '../effects/phoneNumbers';

export type T = {|
  loading: boolean,
  numbers: Array<types.PhoneNumber>,
  error: any,
|};
export const initialState: T = {
  loading: false,
  numbers: [],
  error: {},
};

export const reducer = createReducer({
  [types.FETCH_ACCOUNT_NUMBERS](state) {
    return loop(
      { ...state, loading: true },
      Effects.promise(fetchNumbers, LibApi)
    );
  },
  [types.SET_FETCHED_ACCOUNT_NUMBERS](state, action) {
    return {
      ...state,
      numbers: action.fetchedAccountNumbers,
      error: {},
      loading: false,
    };
  },
  [types.FETCH_ACCOUNT_NUMBER_ERROR](state, action) {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  },
});
