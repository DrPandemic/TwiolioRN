// @flow

import * as types from './types';
import formatError from '../lib/errors';

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
    error: formatError(error),
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
    error: formatError(error),
  };
}

export function scheduleTick(): types.ScheduleTickT {
  return {
    type: types.SCHEDULE_TICK,
  };
}

export function tick(): types.TickT {
  return {
    type: types.TICK,
  };
}

export function failScheduleTick(error: any): types.FailScheduleTickT {
  return {
    type: types.FAIL_SCHEDULE_TICK,
    error: formatError(error),
  };
}
