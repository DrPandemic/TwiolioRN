// @flow

import { persistStore as pS } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

import { store } from '../store';
import * as actions from '../actions/persist';

export const config = {
  storage: FilesystemStorage,
  whitelist: [
    'messages',
  ]
};

export default function persistStore(): Promise<any> {
  return Promise.resolve(pS(
    store,
    config,
  ))
  .then(() => actions.successPersistStore())
  .catch(e => actions.failPersistStore(e));
}
