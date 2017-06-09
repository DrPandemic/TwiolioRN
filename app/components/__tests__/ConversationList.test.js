// @flow

import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

import { PConversationList } from '../ConversationList';
import messageFixture from '../../test_helpers/fixtures/received_message.json';
import { Message } from '../../types';
import { addMessages, getConversations } from '../../types/ConversationStore';

test('renders a row', () => {
  const store = addMessages({}, [
    new Message(messageFixture.simple),
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);
  const row = getConversations(store)[0];

  expect(
    renderer.create(PConversationList.renderRow(row))
  ).toMatchSnapshot();
});

test('renders rows', () => {
  const store = addMessages({}, [
    new Message(messageFixture.simple),
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);

  expect(
    renderer.create(<View>{PConversationList.renderRows(store)}</View>)
  ).toMatchSnapshot();
});
