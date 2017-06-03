import {
  fetchAccountNumbers,
  successFetchAccountNumbers,
  failFetchAccountNumbers,
} from '../account';
import * as types from '../types';

test('fetchAccountNumbers', () => {
  expect(fetchAccountNumbers()).toEqual({
    type: types.FETCH_ACCOUNT_NUMBERS,
  });
});

test('successFetchAccountNumbers', () => {
  const s = Symbol('fetched numbers');
  expect(successFetchAccountNumbers(s)).toEqual({
    type: types.SET_FETCHED_ACCOUNT_NUMBERS,
    fetchedAccountNumbers: s,
  });
});

test('failFetchAccountNumbers', () => {
  const s = Symbol('error');
  expect(failFetchAccountNumbers(s)).toEqual({
    type: types.FETCH_ACCOUNT_NUMBER_ERROR,
    error: s,
  });
});
