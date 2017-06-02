import { fetchAccountNumbers } from '../account';
import { FETCH_ACCOUNT_NUMBERS } from '../types';

test('fetchAccountNumbers return the right type', () => {
  expect(fetchAccountNumbers()).toEqual({
    type: FETCH_ACCOUNT_NUMBERS,
  });
});
