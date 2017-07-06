// @flow

import fixture from '../../test_helpers/fixtures/received_message.json';
import Message from '../Message';

test('conversationId', () => {
  const m0 = new Message(fixture.simple);
  const m1 = new Message(fixture.simpleInverse);
  const m2 = new Message(fixture.simpleOtherFrom);
  const m3 = new Message(fixture.simpleOtherTo);
  const m4 = new Message(fixture.simpleOtherFromTo);
  const m5 = new Message(fixture.simpleOutbound);

  expect(m0.conversationId).toEqual(m0.conversationId);
  expect(m0.conversationId).not.toEqual(m1.conversationId);
  expect(m0.conversationId).not.toEqual(m2.conversationId);
  expect(m0.conversationId).not.toEqual(m3.conversationId);
  expect(m2.conversationId).not.toEqual(m3.conversationId);
  expect(m0.conversationId).not.toEqual(m4.conversationId);
  expect(m0.conversationId).toEqual(m5.conversationId);
});

test('conversationUsers', () => {
  const m0 = new Message(fixture.simple);
  const m1 = new Message(fixture.simpleInverse);
  const m2 = new Message(fixture.simpleOutbound);

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

test('compare', () => {
  const m0 = new Message(fixture.chronologicallyUnorderedList[0]);
  const m1 = new Message(fixture.chronologicallyUnorderedList[1]);
  const m2 = new Message(fixture.chronologicallyUnorderedList[2]);

  expect(m0.compare(m0)).toEqual(0);
  expect(m1.compare(m1)).toEqual(0);
  expect(m2.compare(m2)).toEqual(0);

  expect(m0.compare(m1)).toEqual(1);
  expect(m1.compare(m0)).toEqual(-1);
});
