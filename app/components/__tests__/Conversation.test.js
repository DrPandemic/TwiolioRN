// @flow

import renderer from 'react-test-renderer';

import { PConversation } from '../Conversation';
import messageFixture from '../../test_helpers/fixtures/received_message.json';
import { Message } from '../../types';
import { addMessages, getMessagesById } from '../../types/ConversationStore';

test('renders a message', () => {
  const message = new Message(messageFixture.simple);

  expect(renderer.create(PConversation.renderOther(message))).toMatchSnapshot();
  expect(renderer.create(PConversation.renderUs(message))).toMatchSnapshot();
});

test('renders rows', () => {
  const message = new Message(messageFixture.simple);
  const store = addMessages({}, [
    message,
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.secondOutbound),
  ]);
  const messages = getMessagesById(store, message.conversationId);

  expect(renderer.create(PConversation.renderRows(messages))).toMatchSnapshot();
});
