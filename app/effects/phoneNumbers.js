// @flow

import * as actions from '../actions/fetchedAccountNumbers';
import * as types from '../actions/types';

export function fetchNumbers(Api: any) {
  return Api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r => actions.successFetchAccountNumbers(
      r.incoming_phone_numbers.map(number => new types.PhoneNumber(number))
    ))
    .catch(e => actions.failFetchAccountNumbers(e));
}
