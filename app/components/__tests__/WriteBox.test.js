// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import { PWriteBox } from '../WriteBox';

test('renders a the box', () => {
  const box = renderer.create(
    <PWriteBox
      to='foo'
      from='bar'
    />
  ).toJSON();

  expect(box).toMatchSnapshot();
});

test('can send from button', () => {
  const spy = jest.fn();
  const box = new PWriteBox({
    to: 'foo',
    from: 'bar',
    sendMessage: spy,
  });
  box.state.text = 'baz';

  const renderedButton = box.renderButton();
  renderedButton.props.onPress();

  expect(spy).toBeCalledWith('foo', 'bar', 'baz');
});

test('can send from keyboard', () => {
  const spy = jest.fn();
  const box = new PWriteBox({
    to: 'foo',
    from: 'bar',
    sendMessage: spy,
  });
  box.state.text = 'baz';

  const renderedButton = box.renderInput();
  renderedButton.props.onSubmitEditing();

  expect(spy).toBeCalledWith('foo', 'bar', 'baz');
});
