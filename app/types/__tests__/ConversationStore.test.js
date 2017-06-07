// @flow

import { addMessages, getMessages, filterByUs } from '../ConversationStore';
import phoneFixture from '../../test_helpers/fixtures/received_message.json';
import Message from '../Message';

test('is able to get back a single message', () => {
  const m0 = new Message(phoneFixture.simple);
  const store0 = {};

  const store1 = addMessages(store0, [m0]);
  const messages = getMessages(store1, m0.conversationUsers);

  expect(messages).toHaveLength(1);
  expect(messages).toContainEqual(m0);
});

test('is able to get back a single message after many saves', () => {
  const m0 = new Message(phoneFixture.simple);
  const m1 = new Message(phoneFixture.simpleInverse);
  const m2 = new Message(phoneFixture.simpleOtherFrom);
  const m3 = new Message(phoneFixture.simpleOutbound);
  let store = {};

  store = addMessages(store, [m0, m1]);
  store = addMessages(store, [m0]);
  store = addMessages(store, [m2, m3]);
  const messages0 = getMessages(store, m0.conversationUsers);
  const messages1 = getMessages(store, m1.conversationUsers);
  const messages2 = getMessages(store, m2.conversationUsers);
  const messages3 = getMessages(store, m3.conversationUsers);

  expect(messages0).toHaveLength(2);
  expect(messages0).toEqual(expect.arrayContaining([m0, m3]));
  expect(messages1).toHaveLength(1);
  expect(messages1).toEqual(expect.arrayContaining([m1]));
  expect(messages2).toHaveLength(1);
  expect(messages2).toEqual(expect.arrayContaining([m2]));
  expect(messages3).toHaveLength(2);
  expect(messages3).toEqual(expect.arrayContaining([m0, m3]));
});

test('filterByUs', () => {
  const m0 = new Message(phoneFixture.simple);
  const m1 = new Message(phoneFixture.simpleInverse);
  const m2 = new Message(phoneFixture.simpleOtherFrom);
  const m3 = new Message(phoneFixture.simpleOutbound);
  const store0 = addMessages({}, [m0, m1, m2, m3]);

  const store1 = filterByUs(store0, m0.conversationUsers.us);
  const store2 = filterByUs(store0, m1.conversationUsers.us);

  expect(Object.keys(store1)).toHaveLength(2);
  expect(Object.keys(store1)).toEqual(expect.arrayContaining([
    m0.conversationId,
    m2.conversationId,
  ]));
  expect(Object.keys(store2)).toHaveLength(1);
  expect(Object.keys(store2)).toEqual(expect.arrayContaining([
    m1.conversationId,
  ]));
});
