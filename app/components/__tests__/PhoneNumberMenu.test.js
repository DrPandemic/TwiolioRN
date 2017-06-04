import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import { PhoneNumberMenu } from '../PhoneNumberMenu';
import phoneFixture from '../../test_helpers/fixtures/received_phone_number.json';
import { PhoneNumber } from '../../actions/types';
import { initialState as nInitial } from '../../reducers/fetchedAccountNumbers';
import { initialState as aInitial } from '../../reducers/account';

test('renders an empty menu', () => {
  const menu = new PhoneNumberMenu({
    fetchedAccountNumbers: { ...nInitial },
    account: { ...aInitial },
    selectNumber: () => {},
  });
  expect(renderer.create(menu.renderNumbers())).toMatchSnapshot();
});

test('renders menu with a number', () => {
  const menu = new PhoneNumberMenu({
    fetchedAccountNumbers: {
      ...nInitial,
      numbers: [new PhoneNumber(phoneFixture.simple)],
    },
    account: { ...aInitial },
    selectNumber: () => {},
  });
  expect(renderer.create(menu.renderNumbers())).toMatchSnapshot();
});

test('renders a selected number', () => {
  const menu = new PhoneNumberMenu({
    fetchedAccountNumbers: {
      ...nInitial,
      numbers: [new PhoneNumber(phoneFixture.simple)],
    },
    account: {
      ...aInitial,
      selectedNumber: phoneFixture.simple.sid,
    },
    selectNumber: () => {},
  });
  expect(renderer.create(
    <Text>
      {menu.renderSelectedNumber()}
    </Text>
  )).toMatchSnapshot();
});

test('renders an unselected number', () => {
  const menu = new PhoneNumberMenu({
    fetchedAccountNumbers: {
      ...nInitial,
      numbers: [new PhoneNumber(phoneFixture.simple)],
    },
    account: {
      ...aInitial,
      selectedNumber: null,
    },
    selectNumber: () => {},
  });
  expect(renderer.create(
    <Text>
      {menu.renderSelectedNumber()}
    </Text>
  )).toMatchSnapshot();
});
