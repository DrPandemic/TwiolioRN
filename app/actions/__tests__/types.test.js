import {
  FETCH_ACCOUNT_NUMBERS,
  SET_FETCHED_ACCOUNT_NUMBERS,
  FETCH_ACCOUNT_NUMBER_ERROR,
  SELECT_NUMBER,
  FETCH_MESSAGES,
  SET_FETCHED_MESSAGES,
  FETCH_MESSAGE_ERROR,
} from '../types';

test('consts are not undefined', () => {
  expect(FETCH_ACCOUNT_NUMBERS).toBeDefined();
  expect(SET_FETCHED_ACCOUNT_NUMBERS).toBeDefined();
  expect(FETCH_ACCOUNT_NUMBER_ERROR).toBeDefined();
  expect(SELECT_NUMBER).toBeDefined();
  expect(FETCH_MESSAGES).toBeDefined();
  expect(SET_FETCHED_MESSAGES).toBeDefined();
  expect(FETCH_MESSAGE_ERROR).toBeDefined();
});
