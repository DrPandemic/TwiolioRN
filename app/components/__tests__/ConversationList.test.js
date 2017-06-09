// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import { PConversationList } from '../ConversationList';
import messageFixture from '../../test_helpers/fixtures/received_message.json';
import { Message } from '../../types';
import { addMessages, getConversations } from '../../types/ConversationStore';
import { initialState as mInitial } from '../../reducers/messages';
import { initialState as aInitial } from '../../reducers/account';

test('renders a list', () => {
  const list = renderer.create(
      <PConversationList
        account={{ ...aInitial }}
        messages={{ ...mInitial }}
      >
      </PConversationList>
  ).toJSON();

  expect(list).toMatchSnapshot();
});

test('renders a row', () => {
  const store = addMessages({}, [
    new Message(messageFixture.simple),
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);
  const row = getConversations(store)[0];

  expect(
    renderer.create(PConversationList.renderRow(row, 'foo'))
  ).toMatchSnapshot();
});
