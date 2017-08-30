// @flow

import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../store');

import { PConversationMenu } from '../ConversationMenu';

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
      goBack={ () => {} }
      location={{ state: 'foo' }}
    >
    </PConversationMenu>
  ).toJSON();

  expect(list).toMatchSnapshot();
});

test('renders a menu without an id', () => {
  const list = renderer.create(
    <PConversationMenu
      goBack={ () => {} }
      location={{ state: { conversationId: 'foo' } }}
    >
    </PConversationMenu>
  ).toJSON();

  expect(list).toMatchSnapshot();
});
