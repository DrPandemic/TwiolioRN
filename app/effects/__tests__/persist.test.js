// @flow

import * as types from '../../actions/types';
/* import { initialState } from '../../reducers';*/
import { persistStore, restoreStore } from '../persist';

test('persistStore success', async () => {
  const spy = jest.fn().mockReturnValue(Promise.resolve());

  const result = await persistStore(spy);

  expect(spy).toBeCalled();
  expect(result).toEqual({
    type: types.SUCCESS_PERSIST_STORE,
  });
});

test('persistStore failure', async () => {
  const error = Symbol('error');
  const spy = jest.fn().mockReturnValue(Promise.reject(error));

  const result = await persistStore(spy);

  expect(spy).toBeCalled();
  expect(result).toEqual({
    type: types.FAIL_PERSIST_STORE,
    error,
  });
});

test('restoreStore success', async () => {
  const state = Symbol('state');
  const spy = jest.fn().mockReturnValue(Promise.resolve(state));

  const result = await restoreStore(spy);

  expect(spy).toBeCalled();
  expect(result).toEqual({
    type: types.SUCCESS_RESTORE_STORE,
    state,
  });
});

test('restoreStore failure', async () => {
  const error = Symbol('error');
  const spy = jest.fn().mockReturnValue(Promise.reject(error));

  const result = await restoreStore(spy);

  expect(spy).toBeCalled();
  expect(result).toEqual({
    type: types.FAIL_RESTORE_STORE,
    error,
  });
});
