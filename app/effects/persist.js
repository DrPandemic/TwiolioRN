// @flow

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

export function persistStore(
  persist: (Object, Object) => Promise<void>
): Promise<any> {
  return Promise.resolve(persist(
    store,
    config,
  ))
  .then(() => actions.successPersistStore())
  .catch(e => actions.failPersistStore(e));
}

export function restoreStore(
  getStoredState: (Object) => Promise<StateT>
): Promise<any> {
  return getStoredState(config)
    .then((state: StateT) => actions.successRestoreStore(state))
    .catch(e => actions.failRestoreStore(e));
}
