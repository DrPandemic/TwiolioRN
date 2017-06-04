import { Effects, loop } from 'redux-loop';

import { reducer, initialState, fetchNumbers } from '../fetchedAccountNumbers';
import * as actions from '../../actions/fetchedAccountNumbers';
import LibApi from '../../lib/api';
import * as types from '../../actions/types';
import phoneFixture from '../../test_helpers/fixtures/received_phone_number.json';
import ApiMock from '../../test_helpers/api_helper';

test('reducer.FETCH_ACCOUNT_NUMBERS', () => {
  const state = { ...initialState, loading: false };

  const result = reducer(state, actions.fetchAccountNumbers());

  expect(result).toEqual(loop(
    { ...initialState, loading: true },
    Effects.promise(fetchNumbers, LibApi)
  ));
});

test('reducer.SET_FETCHED_ACCOUNT_NUMBERS', () => {
  const state = { ...initialState };
  const s = Symbol('fetched numbers');

  const result = reducer(state, actions.successFetchAccountNumbers(s));

  expect(result).toEqual({ ...initialState, numbers: s });
});

test('reducer.FETCH_ACCOUNT_NUMBER_ERROR', () => {
  const state = { ...initialState };
  const s = Symbol('error');

  const result = reducer(state, actions.failFetchAccountNumbers(s));

  expect(result).toEqual({ ...initialState, error: s });
});

test('success followed by an error', () => {
  const state0 = { ...initialState };
  const s0 = Symbol('fetched numbers');
  const s1 = Symbol('error');

  const state1 = reducer(state0, actions.successFetchAccountNumbers(s0));
  const state2 = reducer(state1, actions.failFetchAccountNumbers(s1));

  expect(state2).toEqual({ ...initialState, numbers: s0, error: s1 });
});

test('fetchNumbers success', async () => {
  const api = (new ApiMock()).mock('get', true, {
    incoming_phone_numbers: [phoneFixture.simple]
  });

  const result = await fetchNumbers(api);

  expect(api.get).toBeCalled();
  expect(result).toEqual({
    type: types.SET_FETCHED_ACCOUNT_NUMBERS,
    fetchedAccountNumbers: [
      new types.PhoneNumber(phoneFixture.simple)
    ],
  });
});

test('fetchNumbers failure', async () => {
  const error = Symbol('error');
  const api = (new ApiMock()).mock('get', false, error);

  const result = await fetchNumbers(api);

  expect(api.get).toBeCalled();
  expect(result).toEqual({
    type: types.FETCH_ACCOUNT_NUMBER_ERROR,
    error,
  });
});

test('selectNumber selecting a number', () => {
  const state = { ...initialState, selectedNumber: 'foo' };
  const s = Symbol('number');

  const result = reducer(state, actions.selectNumber(s));

  expect(result).toEqual({ ...initialState, selectedNumber: s });
});

test('selectNumber selecting null', () => {
  const state = { ...initialState, selectedNumber: 'foo' };

  const result = reducer(state, actions.selectNumber(null));

  expect(result).toEqual({ ...initialState, selectedNumber: null });
});
