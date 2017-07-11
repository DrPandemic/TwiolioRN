// @flow

import FilesystemStorage from 'redux-persist-filesystem-storage';
import equal from 'deep-equal';

import { store } from '../store';
import * as actions from '../actions/persist';
import { RefreshInterval } from '../constants';
import type { StateT } from '../reducers';
import type { TickT } from '../actions/types';

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
    .then((state: StateT) => {
      if (equal(state, {})) {
        return actions.failRestoreStore(new Error('Restored state was empty'));
      }
      return actions.successRestoreStore(state);
    })
    .catch(e => actions.failRestoreStore(e));
}

export function scheduleTick(): Promise<TickT> {
  return new Promise(re => {
    setTimeout(re, RefreshInterval);
  })
    .then(() => actions.tick())
    .catch(e => {
      console.error(e);
    });
}
