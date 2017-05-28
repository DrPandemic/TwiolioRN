// @flow

import * as types from './types';
import Api from '../lib/api';

export function fetchAccountNumbers() {
  return (dispatch)  => Api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r => {
      dispatch({
        type: types.SET_FETCHED_ACCOUNT_NUMBERS,
        fetchedAccountNumbers : r.incoming_phone_numbers.map(number => new types.PhoneNumber(number))
      });
    })
    .catch(e => console.error('An error occured while fetching phone numbers', e));
}
