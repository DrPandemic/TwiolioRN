import { loop, Effects } from 'redux-loop';
import * as types from '../actions/types';
import Api from '../lib/api';

function fetchNumbers() {
  return Api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r => ({
      type: types.SET_FETCHED_ACCOUNT_NUMBERS,
      fetchedAccountNumbers: r.incoming_phone_numbers.map(number => new types.PhoneNumber(number)),
    }))
    .catch(e => ({
      type: types.FETCH_ACCOUNT_NUMBER_ERROR,
      error: e,
    }));
}

export const initialState = { loading: false, numbers: [], error: {} };

export const reducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_ACCOUNT_NUMBERS:
      return loop(
        { ...state, loading: true },
        Effects.promise(fetchNumbers),
      );
    case types.SET_FETCHED_ACCOUNT_NUMBERS:
      return {
        ...state,
        numbers: action.fetchedAccountNumbers,
        error: {},
        loading: false,
      };
    case types.FETCH_ACCOUNT_NUMBER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return { ...state };
  }
};
