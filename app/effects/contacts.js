// @flow

import { Contact } from '../types';

export function fetchContacts(RNContacts: any): Promise<Array<Contact>> {
  return new Promise((resolve, reject) => {
    RNContacts.getAll((err, contacts) => {
      if (err) {
        reject(err);
      } else {
        resolve(contacts.map(c => new Contact(c)));
      }
    });
  });
}
