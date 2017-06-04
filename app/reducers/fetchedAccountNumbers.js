// @flow

import { loop, Effects } from 'redux-loop';
import * as types from '../actions/types';
import * as actions from '../actions/fetchedAccountNumbers';
import LibApi from '../lib/api';
import createReducer from '../lib/createReducer';

export type T = {|
  loading: boolean,
  numbers: Array<types.PhoneNumber>,
  error: any,
  selectedNumber: ?string,
|};
export const initialState: T = {
  loading: false,
  numbers: [],
  error: {},
  selectedNumber: null,
};

export function fetchNumbers(Api: any) {
  return Api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r => actions.successFetchAccountNumbers(
      r.incoming_phone_numbers.map(number => new types.PhoneNumber(number))
    ))
    .catch(e => actions.failFetchAccountNumbers(e));
}

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
  [types.SELECT_NUMBER](state, action) {
    return {
      ...state,
      selectedNumber: action.selectedNumber,
    };
  },
});
