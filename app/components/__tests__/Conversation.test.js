// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

jest.mock('../../store');

import createLoopStore from '../../test_helpers/store_helper';
import { PConversation } from '../Conversation';
import messageFixture from '../../test_helpers/fixtures/received_message.json';
import { Message } from '../../types';
import { addMessages } from '../../types/ConversationStore';
import { initialState as mInitial } from '../../reducers/messages';

test('renders a message', () => {
  const message = new Message(messageFixture.simple);

  expect(renderer.create(PConversation.renderOther(message))).toMatchSnapshot();
  expect(renderer.create(PConversation.renderUs(message))).toMatchSnapshot();
});

test('renders an empty conversation', () => {
  const list = renderer.create(
    <Provider store={createLoopStore()}>
      <PConversation
        messages={{ ...mInitial }}
        location={{ state: 'foo' }}
      />
    </Provider>
  ).toJSON();

  expect(list).toMatchSnapshot();
});

test('renders an non-empty conversation', () => {
  const message = new Message(messageFixture.simple);
  const store = addMessages({}, [
    message,
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.secondOutbound),
  ]);

  const list = renderer.create(
    <Provider store={createLoopStore(store)}>
      <PConversation
        messages={{
          ...mInitial,
          messages: store,
        }}
        location={{ state: message.conversationId }}
      />
    </Provider>
  ).toJSON();

  expect(list).toMatchSnapshot();
});
