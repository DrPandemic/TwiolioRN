// @flow

import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../store');

import { PSimpleMenu } from '../SimpleMenu';

test('can go back', () => {
  const spy = jest.fn();
  const menu = new PSimpleMenu({
    goBack: spy,
    location: { state: 'foo' },
  });

  const renderedButton = menu.renderButton();
  renderedButton.props.onPress();

  expect(spy).toBeCalled();
});

test('renders a menu with an id', () => {
  const list = renderer.create(
    <PSimpleMenu
      goBack={ () => {} }
      location={{ state: 'foo' }}
    >
    </PSimpleMenu>
  ).toJSON();

  expect(list).toMatchSnapshot();
});

test('renders a menu without an id', () => {
  const list = renderer.create(
    <PSimpleMenu
      goBack={ () => {} }
      location={{ state: { conversationId: 'foo' } }}
    >
    </PSimpleMenu>
  ).toJSON();

  expect(list).toMatchSnapshot();
});
