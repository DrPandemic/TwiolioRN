// @flow

import { persistStore, restoreStore, scheduleTick } from '../persist';

test('persistStore calls persistStore', async () => {
  const spy = jest.fn().mockReturnValue(Promise.resolve());

  const result = await persistStore(spy);

  expect(spy).toBeCalled();
  expect(result).toEqual(undefined);
});

test('persistStore failure', async () => {
  const error = Symbol('error');
  const spy = jest.fn().mockReturnValue(Promise.reject(error));

  await expect(persistStore(spy)).rejects.toEqual(error);
  expect(spy).toBeCalled();
});

test('restoreStore success', async () => {
  const state = Symbol('state');
  const spy = jest.fn().mockReturnValue(Promise.resolve(state));

  const result = await restoreStore(spy);

  expect(spy).toBeCalled();
  expect(result).toEqual(state);
});

test('restoreStore failure', async () => {
  const error = Symbol('error');
  const spy = jest.fn().mockReturnValue(Promise.reject(error));

  await expect(restoreStore(spy)).rejects.toEqual(error);
  expect(spy).toBeCalled();
});

test('scheduleTick returns at some point', async () => {
  jest.useFakeTimers();
  const timer = scheduleTick();

  jest.runOnlyPendingTimers();
  const result = await timer;

  expect(result).toEqual(undefined);
});
