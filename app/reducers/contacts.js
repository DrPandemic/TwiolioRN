// @flow

import { loop, Cmd } from 'redux-loop';
import RNContacts from 'react-native-contacts';


import { Contact } from '../types';
import effects from '../effects';
import * as types from '../actions/types';
import createReducer from '../lib/createReducer';
import * as contactActions from '../actions/contacts';
import { persistStore } from '../actions/persist';

export type T = {|
  loading: boolean,
  contacts: Array<Contact>,
  error: any,
|};
export const initialState: T = {
  loading: false,
  contacts: [],
  error: null,
};

export const reducer = createReducer({
  [types.TICK](state: T) {
    return loop(
      { ...state },
      Cmd.action(contactActions.fetchContacts())
    );
  },
  [types.FETCH_CONTACTS](
    state: T,
  ) {
    return loop(
      { ...state, loading: true },
      Cmd.run(effects.fetchContacts, {
        successActionCreator: contactActions.successFetchContacts,
        failActionCreator: contactActions.failFetchContacts,
        args: [RNContacts],
      })
    );
  },
  [types.SUCCESS_FETCH_CONTACTS](
    state: T,
    action: types.SuccessFetchContactsT,
  ) {
    return loop({
      ...state,
      contacts: action.contacts,
      loading: false,
      error: null,
    },
    Cmd.action(persistStore())
    );
  },
  [types.FAIL_FETCH_CONTACTS](
    state: T,
    action: types.FailFetchContactsT,
  ) {
    return loop({
      ...state,
      loading: false,
      error: action.error,
    },
    );
  },
});
