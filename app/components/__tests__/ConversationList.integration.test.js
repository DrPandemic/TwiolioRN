// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import { PConversationList } from '../ConversationList';
import messageFixture from '../../test_helpers/fixtures/received_message.json';
import { Message } from '../../types';
import { addMessages } from '../../types/ConversationStore';
import { initialState as mInitial } from '../../reducers/messages';
import { initialState as aInitial } from '../../reducers/account';

test('renders an empty list', () => {
  const list = renderer.create(
      <PConversationList
        account={{ ...aInitial }}
        messages={{ ...mInitial }}
      >
      </PConversationList>
  ).toJSON();

  expect(list).toMatchSnapshot();
});

test('renders an non-empty list', () => {
  const store = addMessages({}, [
    new Message(messageFixture.simple),
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);

  const list = renderer.create(
      <PConversationList
        account={{ ...aInitial }}
        messages={{
          ...mInitial,
          messages: store,
        }}
      >
      </PConversationList>
  ).toJSON();

  expect(list).toMatchSnapshot();
});

test('renders an non-empty list with a selected number', () => {
  const message = new Message(messageFixture.simple);
  const store = addMessages({}, [
    message,
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);

  const list = renderer.create(
      <PConversationList
        account={{
          ...aInitial,
          selectedNumber: message.conversationUsers.us
        }}
        messages={{
          ...mInitial,
          messages: store,
        }}
      >
      </PConversationList>
  ).toJSON();

  expect(list).toMatchSnapshot();
});
