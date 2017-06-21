// @flow

import * as types from './types';

export function fetchMessages(): types.PersistStoreT {
  return {
    type: types.PERSIST_STORE,
  };
}
