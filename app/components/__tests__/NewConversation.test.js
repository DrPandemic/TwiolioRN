// @flow

import renderer from 'react-test-renderer';

jest.mock('../../store');

import { PNewConversation } from '../NewConvervsation';
import contactFixture from '../../test_helpers/fixtures/contacts.json';
import { Contact } from '../../types';
import { expandPhoneNumbers } from '../../types/Contact';
import { initialState } from '../../reducers';

function createContacts(contacts: Array<any>): Array<Contact> {
  return contacts.map(c => new Contact(c));
}

test('renders a row', () => {
  const newConversation = new PNewConversation({
    contacts: {
      ...initialState.contacts,
      contacts: createContacts([contactFixture.simple[0]]),
    },
    push: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders rows', () => {
  const newConversation = new PNewConversation({
    contacts: {
      ...initialState.contacts,
      contacts: createContacts(contactFixture.simple),
    },
    push: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders empty rows', () => {
  const newConversation = new PNewConversation({
    contacts: {
      ...initialState.contacts,
      contacts: [],
    },
    push: () => {},
  });

  expect(
    renderer.create(newConversation.render())
  ).toMatchSnapshot();
});

test('renders a row with correct redirect', () => {
  const spy = jest.fn();
  const contacts = createContacts([contactFixture.simple[0]]);
  const contact = expandPhoneNumbers(contacts)[0];
  const newConversation = new PNewConversation({
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
