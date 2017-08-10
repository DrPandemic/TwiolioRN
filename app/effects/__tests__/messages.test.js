// @flow

import * as types from '../../actions/types';
import fixtures from '../../test_helpers/fixtures/received_message.json';
import completeFixture from '../../test_helpers/fixtures/complete_message.json';
import ApiMock from '../../test_helpers/api_helper';
import { fetchMessages } from '../messages';
import { Message } from '../../types';
import { FetchMessageThresholdInMinutes } from '../../constants';

test('fetchMessages success', async () => {
  const api = (new ApiMock()).mock('get', true, {
    messages: [fixtures.simple]
  });

  const result = await fetchMessages(api);

  expect(api.get).toBeCalled();
  expect(result).toEqual([new Message(fixtures.simple)]);
});

test('fetchMessages with and without a lastFetch', async () => {
  // No lastFetch
  const api0 = (new ApiMock()).mock('get', true, {
    messages: [fixtures.simple]
  });
  await fetchMessages(api0, null);
  expect(api0.get).toBeCalledWith('/Messages.json', null, null, true);

  // With lastFetch with less than the threshold
  const api1 = (new ApiMock()).mock('get', true, {
    messages: [fixtures.simple]
  });
  await fetchMessages(
    api1,
    new Date(2000, 10, 10, 0, FetchMessageThresholdInMinutes/2, 0),
  );
  expect(api1.get).toBeCalledWith(
    "/Messages.json?DateSent%3E=2000-10-09", null, null, true
  );

  // With lastFetch with more than the threshold
  const api2 = (new ApiMock()).mock('get', true, {
    messages: [fixtures.simple]
  });
  await fetchMessages(
    api2,
    new Date(2000, 10, 10, 0, FetchMessageThresholdInMinutes, 1),
  );
  expect(api2.get).toBeCalledWith(
    "/Messages.json?DateSent%3E=2000-10-10", null, null, true
  );
});

test('fetchMessages failure', async () => {
  const error = Symbol('error');
  const api = (new ApiMock()).mock('get', false, error);

  await expect(fetchMessages(api)).rejects.toEqual(error);
  expect(api.get).toBeCalled();
});

test('3 level paging', async () => {
  const [p0, p1, p2] = completeFixture.threePages;
  const api = (new ApiMock()).multiMock('get', [{
    url: '/Messages.json',
    params: null,
    headers: null,
    expandRoute: true,
    resolve: true,
    result: p0,
  }, {
    url: p0.next_page_uri,
    params: null,
    headers: null,
    expandRoute: false,
    resolve: true,
    result: p1,
  }, {
    url: p1.next_page_uri,
    params: null,
    headers: null,
    expandRoute: false,
    resolve: true,
    result: p2,
  }]);

  const result = await fetchMessages(api);

  expect(api.get.mock.calls.length).toEqual(3);
  expect(api.get).toBeCalledWith('/Messages.json', null, null, true);
  expect(api.get).toBeCalledWith(p0.next_page_uri, null, null, false);
  expect(api.get).toBeCalledWith(p1.next_page_uri, null, null, false);
  expect(result).toContainEqual(new Message(p0.messages[0]));
  expect(result).toContainEqual(new Message(p0.messages[1]));
  expect(result).toContainEqual(new Message(p1.messages[0]));
  expect(result).toContainEqual(new Message(p1.messages[1]));
  expect(result).toContainEqual(new Message(p2.messages[0]));
  expect(result).toContainEqual(new Message(p2.messages[1]));
});
