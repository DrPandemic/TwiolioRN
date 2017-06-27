// @flow

import { persistStore as pS, getStoredState } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

import { store } from '../store';
import * as actions from '../actions/persist';
import type { StateT } from '../reducers';

export const config = {
  storage: FilesystemStorage,
  whitelist: [
    'messages',
  ]
};

export function persistStore(): Promise<any> {
  return Promise.resolve(pS(
    store,
    config,
  ))
  .then(() => actions.successPersistStore())
  .catch(e => actions.failPersistStore(e));
}

export function restoreStore(): Promise<any> {
  return getStoredState(config)
    .then((state: StateT) => actions.successRestoreStore(state))
    .catch(e => actions.failRestoreStore(e));
}
