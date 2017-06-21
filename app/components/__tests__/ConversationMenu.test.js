// @flow

import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../store');

import { PConversationMenu } from '../ConversationMenu';
import messageFixture from '../../test_helpers/fixtures/received_message.json';
import { Message } from '../../types';
import { addMessages, getMessagesById } from '../../types/ConversationStore';
import { initialState as mInitial } from '../../reducers/messages';

test('can go back', () => {
  const spy = jest.fn();
  const menu = new PConversationMenu({
    goBack: spy,
    location: { state: 'foo' },
  });

  const renderedButton = menu.renderButton();
  renderedButton.props.onPress();

  expect(spy).toBeCalled();
});

test('renders a menu with an id', () => {
  const list = renderer.create(
      <PConversationMenu
        goBack={ ()=>{} }
        location={{ state: 'foo' }}
      >
      </PConversationMenu>
  ).toJSON();

  expect(list).toMatchSnapshot();
});

test('renders a menu without an id', () => {
  const list = renderer.create(
      <PConversationMenu
        goBack={ ()=>{} }
        location={{}}
      >
      </PConversationMenu>
  ).toJSON();

  expect(list).toMatchSnapshot();
});
