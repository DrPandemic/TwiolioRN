// @flow

import Contact, {
  findContactsForNumber,
} from '../Contact';
import fixture from '../../test_helpers/fixtures/contacts.json';

function createContacts(contacts: Array<any>): Array<Contact> {
  return contacts.map(c => new Contact(c));
}

test('is able to get back no contact', () => {
  const contacts = createContacts(fixture.simple);

  const foundContacts = findContactsForNumber(contacts, '+15144444444');

  expect(foundContacts).toHaveLength(0);
});

test('is able to get back a single contact', () => {
  const contacts = createContacts(fixture.simple);

  const foundContacts = findContactsForNumber(contacts, '+15142222222');

  expect(foundContacts).toHaveLength(1);
  expect(foundContacts[0].givenName).toEqual('Foo');
});

test('is able to get back multiple contacts', () => {
  const contacts = createContacts(fixture.simple);

  const foundContacts = findContactsForNumber(contacts, '+15143333333').sort();

  expect(foundContacts).toHaveLength(2);
  expect(foundContacts[0].givenName).toEqual('Bar');
  expect(foundContacts[1].givenName).toEqual('Baz');
});
