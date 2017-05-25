import * as types from './types';
import Api from '../lib/api';

export function fetchAccountNumbers() {
  return dispatch => Api.get('/IncomingPhoneNumbers.json')
    .then(r => r.json())
    .then(r => {
      dispatch({
        type: types.SET_ACCOUNT_NUMBERS,
        accountNumbers : r.incoming_phone_numbers.map(number => {
          return {
            sid: number.sid,
            friendlyName: number.friendly_name,
            number: number.phone_number,
          };
        })
      });
    })
    .catch(e => console.error('An error occured while fetching phone numbers', e));
}
