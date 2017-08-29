// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import { PWriteBox } from '../WriteBox';

test('renders a the box', () => {
  const box = renderer.create(
    <PWriteBox
      source='foo'
      destination='bar'
    />
  ).toJSON();

  expect(box).toMatchSnapshot();
});
