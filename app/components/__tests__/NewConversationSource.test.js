// @flow

import renderer from 'react-test-renderer';

jest.mock('../../store');

import { PNewConversationSource } from '../NewConversationSource';
import fixtures from '../../test_helpers/fixtures/received_phone_number.json';
import { PhoneNumber } from '../../types';

test('renders a row', () => {
  const newConversation = new PNewConversationSource({
    numbers: [fixtures.simple],
    recipient: fixtures.simple,
    startNewConversation: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders rows', () => {
  const newConversation = new PNewConversationSource({
    numbers: [fixtures.simple, fixtures.other],
    recipient: fixtures.simple,
    startNewConversation: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders empty rows', () => {
  const newConversation = new PNewConversationSource({
    numbers: [],
    recipient: fixtures.simple,
    startNewConversation: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders a row with correct redirect', () => {
  const spy = jest.fn();
  const number = new PhoneNumber(fixtures.other);

  const newConversation = new PNewConversationSource({
    numbers: [number],
    recipient: fixtures.simple,
    startNewConversation: spy,
  });

  const renderedContent = newConversation.renderRow(number);
  renderedContent.props.onPress();

  expect(spy).toBeCalledWith(number, fixtures.simple);
});
