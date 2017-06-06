// @flow

import phoneFixture from '../../test_helpers/fixtures/received_message.json';
import Message from '../Message';

test('getConversationId', () => {
  const m0 = new Message(phoneFixture.simple);
  const m1 = new Message(phoneFixture.simpleInverse);
  const m2 = new Message(phoneFixture.simpleOtherFrom);
  const m3 = new Message(phoneFixture.simpleOtherTo);
  const m4 = new Message(phoneFixture.simpleOtherFromTo);

  expect(m0.getConversationId()).toEqual(m0.getConversationId());
  expect(m0.getConversationId()).toEqual(m1.getConversationId());
  expect(m0.getConversationId()).not.toEqual(m2.getConversationId());
  expect(m0.getConversationId()).not.toEqual(m3.getConversationId());
  expect(m2.getConversationId()).not.toEqual(m3.getConversationId());
  expect(m0.getConversationId()).not.toEqual(m4.getConversationId());
});
