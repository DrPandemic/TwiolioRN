// @flow

import * as types from './types';

export function persistStore(): types.PersistStoreT {
  return {
    type: types.PERSIST_STORE,
  };
}
