// @flow

import phoneFixture from '../../test_helpers/fixtures/received_message.json';
import Message from '../Message';

test('conversationId', () => {
  const m0 = new Message(phoneFixture.simple);
  const m1 = new Message(phoneFixture.simpleInverse);
  const m2 = new Message(phoneFixture.simpleOtherFrom);
  const m3 = new Message(phoneFixture.simpleOtherTo);
  const m4 = new Message(phoneFixture.simpleOtherFromTo);
  const m5 = new Message(phoneFixture.simpleOutbound);

  expect(m0.conversationId).toEqual(m0.conversationId);
  expect(m0.conversationId).not.toEqual(m1.conversationId);
  expect(m0.conversationId).not.toEqual(m2.conversationId);
  expect(m0.conversationId).not.toEqual(m3.conversationId);
  expect(m2.conversationId).not.toEqual(m3.conversationId);
  expect(m0.conversationId).not.toEqual(m4.conversationId);
  expect(m0.conversationId).toEqual(m5.conversationId);
});

test('conversationUsers', () => {
  const m0 = new Message(phoneFixture.simple);
  const m1 = new Message(phoneFixture.simpleInverse);
  const m2 = new Message(phoneFixture.simpleOutbound);

  expect(m0.conversationUsers).toEqual({
    us: '+1231231234',
    other: '+1231231235'
  });
  expect(m1.conversationUsers).toEqual({
    us: '+1231231235',
    other: '+1231231234'
  });
  expect(m2.conversationUsers).toEqual({
    us: '+1231231234',
    other: '+1231231235'
  });
});
