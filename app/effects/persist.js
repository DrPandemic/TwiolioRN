// @flow

import FilesystemStorage from 'redux-persist-filesystem-storage';

import * as actions from '../actions/persist';
import { store } from '../store';
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
  ));
}

export function restoreStore(
  getStoredState: (Object) => Promise<StateT>
): Promise<any> {
  return getStoredState(config)
    .then((state: StateT) => state);
}

export function scheduleTick(): Promise<TickT> {
  return new Promise(re => {
    setTimeout(re, RefreshInterval);
  });
}
