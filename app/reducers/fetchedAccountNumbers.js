// @flow

import { loop, Cmd } from 'redux-loop';
import * as types from '../actions/types';
import * as fetchActions from '../actions/fetchedAccountNumbers';
import { getApi } from '../lib/api';
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
  [types.TICK](state: T) {
    return loop(
      { ...state },
      Cmd.action(fetchActions.fetchAccountNumbers()),
    );
  },
  [types.FETCH_ACCOUNT_NUMBERS](state: T) {
    return loop(
      { ...state, loading: true },
      Cmd.run(effects.fetchNumbers, {
        successActionCreator: fetchActions.successFetchAccountNumbers,
        failActionCreator: fetchActions.failFetchAccountNumbers,
        args: [getApi()],
      })
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
