// @flow

import {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil
} from 'google-libphonenumber';

import { Message } from './';
import { flatMap } from '../lib/array';

const phoneUtil = PhoneNumberUtil.getInstance();

export type Email = {|
  label: string,
  email: string
|};

export type ContactPhoneNumber = {|
  label: string,
  number: string
|};

export type PostalAddress = {|
  postCode: string,
  city: string,
  neighborhood: string,
  street: string,
  formattedAddress: string,
  label: string
|};

export default class Contact {
  recordID: string;
  company: string;
  emailAddresses: Array<Email>;
  familyName: string;
  givenName: string;
  jobTitle: string;
  middleName: string;
  phoneNumbers: Array<ContactPhoneNumber>;
  hasThumbnail: boolean;
  thumbnailPath: string;
  postalAddresses: Array<PostalAddress>;

  constructor(response: any) {
    this.recordID = response.recordID;
    this.company = response.company;
    this.emailAddresses = response.emailAddresses;
    this.familyName = response.familyName;
    this.givenName = response.givenName;
    this.jobTitle = response.jobTitle;
    this.middleName = response.middleName;
    this.phoneNumbers = response.phoneNumbers.map(
      p => ({
        ...p,
        number: phoneUtil.format(phoneUtil.parse(p.number, 'US'), PNF.E164),
      })
    );
    this.hasThumbnail = response.hasThumbnail;
    this.thumbnailPath = response.thumbnailPath;
    this.postalAddresses = response.postalAddresses;
  }
}

export type PhoneNumberWithContact = {
  contact: Contact,
  phoneNumber: string
};

export function findContactsForNumber(
  contacts: Array<Contact>,
  number: string,
): Array<Contact> {
  const formattedNumber = phoneUtil.parse(number);
  return contacts.filter(
    c => c.phoneNumbers.filter(
      n => phoneUtil.isNumberMatch(phoneUtil.parse(n.number), formattedNumber) >= 2
    ).length > 0
  );
}

export function getNameForMessage(
  contacts: Array<Contact>,
  message: Message,
): string {
  const number = message.conversationUsers.other;
  const foundContacts = findContactsForNumber(contacts, number);

  return foundContacts.length > 0 ? foundContacts[0].givenName : number;
}

export function expandPhoneNumbers(contacts: Array<Contact>): Array<PhoneNumberWithContact> {
  return flatMap(contacts,
    contact => contact.phoneNumbers.map(
      n => ({ contact, phoneNumber: n.number })
    ));
}
