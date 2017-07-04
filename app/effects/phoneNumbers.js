// @flow

import * as actions from '../actions/fetchedAccountNumbers';
import { PhoneNumber } from '../types';

export function fetchNumbers(api: any) {
  return api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r => actions.successFetchAccountNumbers(
      r.incoming_phone_numbers.map(number => new PhoneNumber(number))
    ))
    .catch(e => actions.failFetchAccountNumbers(e));
}
