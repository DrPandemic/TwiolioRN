// @flow

import { loop, Effects } from 'redux-loop';
import * as types from '../actions/types';
import LibApi from '../lib/api';
import createReducer from '../lib/createReducer';
import effects from '../effects';
import { PhoneNumber } from '../types';

export type T = {|
  loading: boolean,
  numbers: Array<PhoneNumber>,
  error: any,
|};
export const initialState: T = {
  loading: false,
  numbers: [],
  error: {},
};

export const reducer = createReducer({
  [types.FETCH_ACCOUNT_NUMBERS](state: T) {
    return loop(
      { ...state, loading: true },
      Effects.promise(effects.fetchNumbers, LibApi)
    );
  },
  [types.SET_FETCHED_ACCOUNT_NUMBERS](
    state: T,
    action: types.SuccessFetchAccountNumbersT
  ) {
    return {
      ...state,
      numbers: action.fetchedAccountNumbers,
      error: {},
      loading: false,
    };
  },
  [types.FETCH_ACCOUNT_NUMBER_ERROR](
    state: T,
    action: types.FailFetchAccountNumbersT
  ) {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  },
});
