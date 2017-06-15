// @flow

import { addMessages, getMessages, getMessagesById, filterByUs } from '../ConversationStore';
import fixture from '../../test_helpers/fixtures/received_message.json';
import Message from '../Message';

test('is able to get back a single message', () => {
  const m0 = new Message(fixture.simple);
  const store0 = {};

  const store1 = addMessages(store0, [m0]);
  const messages = getMessages(store1, m0.conversationUsers);

  expect(messages).toHaveLength(1);
  expect(messages).toContainEqual(m0);
});

test('is able to get back a single message by id', () => {
  const m0 = new Message(fixture.simple);

  const store = addMessages({}, [m0]);
  const messages = getMessagesById(store, m0.conversationId);

  expect(messages).toHaveLength(1);
  expect(messages).toContainEqual(m0);
});

test('is able to fetch an unexisting messages', () => {
  const m0 = new Message(fixture.simple);

  const store = addMessages({}, [m0]);
  const messages = getMessagesById(store, `${m0.conversationId}foo`);

  expect(messages).toHaveLength(0);
});

test('is able to get back a single message after many saves', () => {
  const m0 = new Message(fixture.simple);
  const m1 = new Message(fixture.simpleInverse);
  const m2 = new Message(fixture.simpleOtherFrom);
  const m3 = new Message(fixture.simpleOutbound);
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
  const m0 = new Message(fixture.simple);
  const m1 = new Message(fixture.simpleInverse);
  const m2 = new Message(fixture.simpleOtherFrom);
  const m3 = new Message(fixture.simpleOutbound);
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

test('filterByUs with null us', () => {
  const m0 = new Message(fixture.simple);
  const m1 = new Message(fixture.simpleInverse);
  const m2 = new Message(fixture.simpleOtherFrom);
  const m3 = new Message(fixture.simpleOutbound);
  const store0 = addMessages({}, [m0, m1, m2, m3]);

  const store1 = filterByUs(store0, null);

  expect(Object.keys(store1)).toHaveLength(3);
  expect(Object.keys(store1)).toEqual(expect.arrayContaining([
    m0.conversationId,
    m1.conversationId,
    m2.conversationId,
  ]));
});

test('messages are ordered', () => {
  const m0 = new Message(fixture.chronologicallyUnorderedList[0]);
  const m1 = new Message(fixture.chronologicallyUnorderedList[1]);
  const m2 = new Message(fixture.chronologicallyUnorderedList[2]);
  const store = addMessages({}, [m0, m1, m2]);
  const messages = getMessages(store, m0.conversationUsers);

  expect(messages).toHaveLength(3);
  expect(messages[0]).toEqual(m1);
  expect(messages[1]).toEqual(m2);
  expect(messages[2]).toEqual(m0);
});
