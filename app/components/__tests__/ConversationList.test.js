// @flow

import renderer from 'react-test-renderer';

jest.mock('../../store');

import { PConversationList } from '../ConversationList';
import messageFixture from '../../test_helpers/fixtures/received_message.json';
import { Message } from '../../types';
import { addMessages, getConversations } from '../../types/ConversationStore';
import { initialState } from '../../reducers';

test('renders a row', () => {
  const store = addMessages({}, [
    new Message(messageFixture.simple),
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);
  const row = getConversations(store)[0];
  const conversationList = new PConversationList({
    account: { ...initialState.account },
    messages: {
      ...initialState.messages,
      messages: store,
    },
    push: () => {},
  });

  expect(
    renderer.create(conversationList.renderRow(row))
  ).toMatchSnapshot();
});

test('renders rows', () => {
  const store = addMessages({}, [
    new Message(messageFixture.simple),
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);
  const conversationList = new PConversationList({
    account: { ...initialState.account },
    messages: {
      ...initialState.messages,
      messages: store,
    },
    push: () => {},
  });

  expect(
    renderer.create(conversationList.render())
  ).toMatchSnapshot();
});

test('renders empty rows', () => {
  const conversationList = new PConversationList({
    account: { ...initialState.account },
    messages: { ...initialState.messages },
    push: () => {},
  });

  expect(
    renderer.create(conversationList.render())
  ).toMatchSnapshot();
});

test('renders rows with selected number', () => {
  const message = new Message(messageFixture.simple);
  const store = addMessages({}, [
    message,
    new Message(messageFixture.simpleInverse),
    new Message(messageFixture.simpleOtherFrom),
    new Message(messageFixture.simpleOutbound),
  ]);
  const conversationList = new PConversationList({
    account: {
      ...initialState.account,
      selectedNumber: message.conversationUsers.us,
    },
    messages: {
      ...initialState.messages,
      messages: store,
    },
    push: () => {},
  });

  expect(
    renderer.create(conversationList.render())
  ).toMatchSnapshot();
});

test('renders a row with correct redirect', () => {
  const store = addMessages({}, [
    new Message(messageFixture.simple),
  ]);
  const row = getConversations(store)[0];
  const spy = jest.fn();
  const conversationList = new PConversationList({
    account: { ...initialState.account },
    messages: {
      ...initialState.messages,
      messages: store,
    },
    push: spy,
  });

  const renderedRow = conversationList.renderRow(row);
  renderedRow.props.onPress();

  expect(spy).toBeCalledWith({
    pathname: '/conversation',
    state: {
      conversationId: row[0].conversationId,
      to: row[0].conversationUsers.other,
      from: row[0].conversationUsers.us,
    }
  });
});
