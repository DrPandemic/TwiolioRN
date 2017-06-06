import * as types from '../../actions/types';
import phoneFixture from '../../test_helpers/fixtures/received_phone_number.json';
import ApiMock from '../../test_helpers/api_helper';
import { fetchNumbers } from '../phoneNumbers';
import { PhoneNumber } from '../../types';

test('fetchNumbers success', async () => {
  const api = (new ApiMock()).mock('get', true, {
    incoming_phone_numbers: [phoneFixture.simple]
  });

  const result = await fetchNumbers(api);

  expect(api.get).toBeCalled();
  expect(result).toEqual({
    type: types.SET_FETCHED_ACCOUNT_NUMBERS,
    fetchedAccountNumbers: [
      new PhoneNumber(phoneFixture.simple)
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
