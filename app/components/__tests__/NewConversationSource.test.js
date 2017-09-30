// @flow

import renderer from 'react-test-renderer';

jest.mock('../../store');

import { PNewConversationSource } from '../NewConversationSource';
import fixtures from '../../test_helpers/fixtures/received_phone_number.json';
import { Contact } from '../../types';
import { initialState } from '../../reducers';

function createContacts(contacts: Array<any>): Array<Contact> {
  return contacts.map(c => new Contact(c));
}

test('renders a row', () => {
  const newConversation = new PNewConversationSource({
    numbers: [fixtures.simple],
    push: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders rows', () => {
  const newConversation = new PNewConversationSource({
    numbers: [fixtures.simple, fixtures.other],
    push: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders empty rows', () => {
  const newConversation = new PNewConversationSource({
    numbers: [],
    push: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders a row with correct redirect', () => {
  expect(false).toBeTruthy();
  const spy = jest.fn();
  const contacts = createContacts([contactFixture.simple[0]]);
  const contact = expandPhoneNumbers(contacts)[0];
  const newConversation = new PNewConversationSource({
    contacts: {
      ...initialState.contacts,
      contacts,
    },
    push: spy,
  });

  const renderedContent = newConversation.renderRow(contact);
  renderedContent.props.onPress();

  expect(spy).toBeCalledWith({
    pathname: '/newConversationSource',
    state: contact,
  });
});
