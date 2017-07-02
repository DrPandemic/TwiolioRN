// @flow

import * as types from '../../actions/types';
import fixtures from '../../test_helpers/fixtures/received_message.json';
import completeFixture from '../../test_helpers/fixtures/complete_message.json';
import ApiMock from '../../test_helpers/api_helper';
import { fetchMessages } from '../messages';
import { Message } from '../../types';

test('fetchNumbers success', async () => {
  const api = (new ApiMock()).mock('get', true, {
    messages: [fixtures.simple]
  });

  const result = await fetchMessages(api);

  expect(api.get).toBeCalled();
  expect(result).toEqual({
    type: types.SET_FETCHED_MESSAGES,
    fetchedMessages: [
      new Message(fixtures.simple)
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

test('3 level paging', async () => {
  const [p0, p1, p2] = completeFixture.threePages;
  const api = (new ApiMock()).multiMock('get', [{
    url: '/Messages.json',
    params: undefined,
    expandRoute: true,
    resolve: true,
    result: p0,
  }, {
    url: p0.next_page_uri,
    params: undefined,
    expandRoute: false,
    resolve: true,
    result: p1,
  }, {
    url: p1.next_page_uri,
    params: undefined,
    expandRoute: false,
    resolve: true,
    result: p2,
  }]);

  const result = await fetchMessages(api);

  expect(api.get.mock.calls.length).toEqual(3);
  expect(api.get).toBeCalledWith('/Messages.json', undefined, true);
  expect(api.get).toBeCalledWith(p0.next_page_uri, undefined, false);
  expect(api.get).toBeCalledWith(p1.next_page_uri, undefined, false);
  expect(result.type).toEqual(types.SET_FETCHED_MESSAGES);
  expect(result.fetchedMessages).toContainEqual(new Message(p0.messages[0]));
  expect(result.fetchedMessages).toContainEqual(new Message(p0.messages[1]));
  expect(result.fetchedMessages).toContainEqual(new Message(p1.messages[0]));
  expect(result.fetchedMessages).toContainEqual(new Message(p1.messages[1]));
  expect(result.fetchedMessages).toContainEqual(new Message(p2.messages[0]));
  expect(result.fetchedMessages).toContainEqual(new Message(p2.messages[1]));
});
