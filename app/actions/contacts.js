// @flow

import * as types from './types';
import { Contact } from '../types';

export function fetchContacts(): types.FetchContactsT {
  return {
    type: types.FETCH_CONTACTS,
  };
}

export function successFetchContacts(contacts: Array<Contact>): types.SuccessFetchContactsT {
  return {
    type: types.SUCCESS_FETCH_CONTACTS,
    contacts,
  };
}

export function failFetchContacts(error: any): types.FailFetchContactsT {
  return {
    type: types.FAIL_FETCH_CONTACTS,
    error,
  };
}
