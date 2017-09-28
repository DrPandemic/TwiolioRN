// @flow

import Contact, {
  findContactsForNumber,
  getNameForMessage,
  expandPhoneNumbers,
} from '../Contact';
import { Message } from '../';
import fixture from '../../test_helpers/fixtures/contacts.json';
import messageFixture from '../../test_helpers/fixtures/received_message.json';

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

test('is able to get back a name', () => {
  const contacts = createContacts(fixture.simple);
  const message = new Message(messageFixture.simple);

  const name = getNameForMessage(contacts, message);

  expect(name).toEqual('Booing');
});

test('is able to get back a name even when no contact match', () => {
  const contacts = createContacts(fixture.simple);
  const message = new Message(messageFixture.simpleInverse);

  const name = getNameForMessage(contacts, message);

  expect(name).toEqual(message.conversationUsers.other);
});


test('expandPhoneNumbers works', () => {
  const contacts = createContacts(fixture.multipleNumbers);

  const numbers = expandPhoneNumbers(contacts);

  expect(numbers).toHaveLength(3);
  expect(numbers).toContainEqual({
    contact: fixture.multipleNumbers[0],
    phoneNumber: fixture.multipleNumbers[0].phoneNumbers[0].number,
  });
  expect(numbers).toContainEqual({
    contact: fixture.multipleNumbers[1],
    phoneNumber: fixture.multipleNumbers[1].phoneNumbers[0].number,
  });
  expect(numbers).toContainEqual({
    contact: fixture.multipleNumbers[1],
    phoneNumber: fixture.multipleNumbers[1].phoneNumbers[1].number,
  });
});
