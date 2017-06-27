// @flow

import {
  addMessages,
  filterByUs,
  getConversations,
  getMessages,
  getMessagesById,
  restore,
} from '../ConversationStore';
import fixture from '../../test_helpers/fixtures/received_message.json';
import storeFixture from '../../test_helpers/fixtures/conversation_store.json';
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
  expect(messages[0]).toEqual(m0);
  expect(messages[1]).toEqual(m2);
  expect(messages[2]).toEqual(m1);
});

test('conversations are ordered', () => {
  const m0 = new Message(fixture.chronologicallyUnorderedConversations[0]);
  const m1 = new Message(fixture.chronologicallyUnorderedConversations[1]);
  const m2 = new Message(fixture.chronologicallyUnorderedConversations[2]);
  const m3 = new Message(fixture.chronologicallyUnorderedConversations[3]);
  const m4 = new Message(fixture.chronologicallyUnorderedConversations[4]);
  const m5 = new Message(fixture.chronologicallyUnorderedConversations[5]);

  const store = addMessages({}, [m0, m1, m2, m3, m4, m5]);
  const conversations = getConversations(store);

  expect(conversations[0][0].sid).toEqual(m5.sid);
  expect(
    conversations[1][0].sid === m3.sid ||
    conversations[1][0].sid === m0.sid
  ).toBeTruthy();
  expect(
    conversations[2][0].sid === m3.sid ||
    conversations[2][0].sid === m0.sid
  ).toBeTruthy();
  expect(conversations[3][0].sid).toEqual(m4.sid);
});

test('restore', () => {
  const store = restore(storeFixture.simple);
  const conversations = getConversations(store);

  expect(
    conversations[0][0].sid === 'sid0' ||
    conversations[0][0].sid === 'sid1'
  ).toBeTruthy();
  expect(
    conversations[0][1].sid === 'sid0' ||
    conversations[0][1].sid === 'sid1'
  ).toBeTruthy();
  expect(conversations[0][0]).not.toBe(conversations[0][1]);
  expect(conversations[1][0].sid).toEqual('sid2');

  expect(restore(['something not good'])).toEqual({});
});
