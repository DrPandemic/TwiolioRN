// @flow

import * as types from './types';

export function persistStore(): types.PersistStoreT {
  return {
    type: types.PERSIST_STORE,
  };
}

export function successPersistStore(): types.SuccessPersistStoreT {
  return {
    type: types.SUCCESS_PERSIST_STORE,
  };
}

export function failPersistStore(error: any): types.FailPersistStoreT {
  return {
    type: types.FAIL_PERSIST_STORE,
    error,
  };
}
