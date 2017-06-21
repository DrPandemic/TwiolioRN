// @flow

import React from 'react';
import { Text } from 'react-native';

jest.mock('../../store');

jest.mock('react-native-popup-menu', () => ({
  Menu: 'Menu',
  MenuContext: 'MenuContext',
  MenuOptions: 'MenuOptions',
  MenuOption: 'MenuOption',
  MenuTrigger: 'MenuTrigger',
}));

import { PPhoneNumberMenu } from '../PhoneNumberMenu';

import renderer from 'react-test-renderer';

import phoneFixture from '../../test_helpers/fixtures/received_phone_number.json';
import { PhoneNumber } from '../../types';
import { initialState as nInitial } from '../../reducers/fetchedAccountNumbers';
import { initialState as aInitial } from '../../reducers/account';

test('renders with an empty menu', () => {
  const menu = renderer.create(
      <PPhoneNumberMenu
        fetchedAccountNumbers={{ ...nInitial }}
        account={{ ...aInitial }}
        selectNumber={() => {}}
      >
      </PPhoneNumberMenu>
  ).toJSON();

  expect(menu).toMatchSnapshot();
});

test('renders menu with a number', () => {
  const menu = renderer.create(
      <PPhoneNumberMenu
        fetchedAccountNumbers={{
          ...nInitial,
          numbers: [new PhoneNumber(phoneFixture.simple)],
        }}
        account={{ ...aInitial }}
        selectNumber={() => {}}
      >
      </PPhoneNumberMenu>
  ).toJSON();

  expect(menu).toMatchSnapshot();
});
