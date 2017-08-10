// @flow

import { PhoneNumber } from '../types';

export function fetchNumbers(api: any) {
  return api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r =>
      r.incoming_phone_numbers.map(number => new PhoneNumber(number))
    );
}
