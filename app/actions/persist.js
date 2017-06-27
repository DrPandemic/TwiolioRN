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

export function restoreStore(): types.RestoreStoreT {
  return {
    type: types.RESTORE_STORE,
  };
}

export function successRestoreStore(state: any): types.SuccessRestoreStoreT {
  return {
    type: types.SUCCESS_RESTORE_STORE,
    state,
  };
}

export function failRestoreStore(error: any): types.FailRestoreStoreT {
  return {
    type: types.FAIL_RESTORE_STORE,
    error,
  };
}
