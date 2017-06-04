// @flow

import * as types from './types';

export function fetchAccountNumbers() {
  return {
    type: types.FETCH_ACCOUNT_NUMBERS,
  };
}

export function successFetchAccountNumbers(numbers: Array<types.PhoneNumber>) {
  return {
    type: types.SET_FETCHED_ACCOUNT_NUMBERS,
    fetchedAccountNumbers: numbers,
  };
}

export function failFetchAccountNumbers(error: any) {
  return {
    type: types.FETCH_ACCOUNT_NUMBER_ERROR,
    error,
  };
}
