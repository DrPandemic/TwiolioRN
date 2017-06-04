import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MenuContext } from 'react-native-popup-menu';

import PhoneNumberMenu from '../PhoneNumberMenu';
import createStore from '../../test_helpers/store_helper';
import phoneFixture from '../../test_helpers/fixtures/received_phone_number.json';
import { PhoneNumber } from '../../actions/types';

test('renders an empty menu', () => {
  const store = createStore();
  expect(renderer.create(
    <Provider store={store}>
      <MenuContext>
        <PhoneNumberMenu/>
      </MenuContext>
    </Provider>
  )).toMatchSnapshot();
});

test('renders menu with a number', () => {
  const store = createStore({
    fetchedAccountNumbers: {
      numbers: [new PhoneNumber(phoneFixture.simple)],
    }
  });

  expect(renderer.create(
    <Provider store={store}>
      <MenuContext>
        <PhoneNumberMenu/>
      </MenuContext>
    </Provider>
  )).toMatchSnapshot();
});
