import * as types from '../../actions/types';
import fixtures from '../../test_helpers/fixtures/received_message.json';
import ApiMock from '../../test_helpers/api_helper';
import { fetchMessages } from '../messages';

test('fetchNumbers success', async () => {
  const api = (new ApiMock()).mock('get', true, {
    messages: [fixtures.simple]
  });

  const result = await fetchMessages(api);

  expect(api.get).toBeCalled();
  expect(result).toEqual({
    type: types.SET_FETCHED_MESSAGES,
    fetchedMessages: [
      new types.Message(fixtures.simple)
    ],
  });
});

test('fetchNumbers failure', async () => {
  const error = Symbol('error');
  const api = (new ApiMock()).mock('get', false, error);

  const result = await fetchMessages(api);

  expect(api.get).toBeCalled();
  expect(result).toEqual({
    type: types.FETCH_MESSAGE_ERROR,
    error,
  });
});
