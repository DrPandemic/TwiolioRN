// @flow

import * as types from './types';
import { PhoneNumber } from '../types';
import formatError from '../lib/errors';

export function fetchAccountNumbers(): types.FetchAccountNumbersT {
  return {
    type: types.FETCH_ACCOUNT_NUMBERS,
  };
}

export function successFetchAccountNumbers(numbers: Array<PhoneNumber>):
types.SuccessFetchAccountNumbersT {
  return {
    type: types.SET_FETCHED_ACCOUNT_NUMBERS,
    fetchedAccountNumbers: numbers,
  };
}

export function failFetchAccountNumbers(error: any):
types.FailFetchAccountNumbersT {
  return {
    type: types.FETCH_ACCOUNT_NUMBER_ERROR,
    error: formatError(error),
  };
}
