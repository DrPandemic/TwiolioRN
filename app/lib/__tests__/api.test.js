// @flow

import Api, { getApi } from '../api';

function getDefaultConfig() {
  return {
    ShouldMockFetch: false,
    fetch: jest.fn(() => Promise.resolve({ ok: true })),
    mocks: [],
  };
}


test('getApi resturns the same Api', () => {
  expect(getApi()).toBe(getApi());
});

test('uses mocks when needed', async () => {
  const config0 = {
    ShouldMockFetch: true,
    fetch: jest.fn(() => Promise.resolve({ ok: true })),
    mocks: [{
      method: 'GET',
      url: 'https://api.twilio.com/2010-04-01/Accounts/foo/wow',
      response: Symbol('response00'),
    }],
  };
  const api0 = new Api(config0);
  await api0.get('/wow');

  expect(config0.fetch).not.toBeCalled();

  const config1 = {
    ShouldMockFetch: false,
    fetch: jest.fn(() => Promise.resolve({ ok: true })),
    mocks: [{
      method: 'GET',
      url: 'https://api.twilio.com/2010-04-01/Accounts/foo/wow',
      response: Symbol('response01'),
    }],
  };
  const api1 = new Api(config1);
  await api1.get('/wow');

  expect(config1.fetch).toBeCalled();

  const config2 = getDefaultConfig();
  const api2 = new Api(config2);
  await api2.get('/wow');

  expect(config2.fetch).toBeCalled();

  const config3 = {
    ShouldMockFetch: false,
    fetch: jest.fn(() => Promise.resolve({ ok: true })),
    mocks: [{
      method: 'GET',
      url: 'https://api.twilio.com/2010-04-01/Accounts/foo/notgoodurl',
      response: Symbol('response03'),
    }],
  };
  const api3 = new Api(config3);
  await api3.get('/wow');

  expect(config3.fetch).toBeCalled();
});

test('each function execute with the right verb', async () => {
  const config = getDefaultConfig();
  const api = new Api(config);

  await api.get('/wow');
  await api.head('/wow');
  await api.put('/wow');
  await api.post('/wow');
  await api.delete('/wow');

  expect(config.fetch.mock.calls[0][1]).toEqual(expect.objectContaining({
    method: 'GET',
  }));
  expect(config.fetch.mock.calls[1][1]).toEqual(expect.objectContaining({
    method: 'HEAD',
  }));
  expect(config.fetch.mock.calls[2][1]).toEqual(expect.objectContaining({
    method: 'PUT',
  }));
  expect(config.fetch.mock.calls[3][1]).toEqual(expect.objectContaining({
    method: 'POST',
  }));
  expect(config.fetch.mock.calls[4][1]).toEqual(expect.objectContaining({
    method: 'DELETE',
  }));
});

test('expands route', async () => {
  const config = getDefaultConfig();
  const api = new Api(config);

  await api.get('/wow', undefined, undefined, false);
  await api.get('/wow', undefined, undefined, true);

  expect(config.fetch.mock.calls[0][0]).toEqual(
    'https://api.twilio.com/wow'
  );
  expect(config.fetch.mock.calls[1][0]).toEqual(
    'https://api.twilio.com/2010-04-01/Accounts/foo/wow'
  );
});

test('stringify params as body', async () => {
  const config = getDefaultConfig();
  const api = new Api(config);

  await api.get('/wow', undefined, undefined, false);
  await api.get('/wow', { secret: 'yes' }, undefined, false);

  expect(config.fetch.mock.calls[0][1]).not.toHaveProperty('body');
  expect(config.fetch.mock.calls[1][1]).toHaveProperty(
    'body', JSON.stringify({ secret: 'yes' })
  );
});

test('can add headers', async () => {
  const config = getDefaultConfig();
  const api = new Api(config);
  const headerSymbol = Symbol('headers');

  await api.get('/wow', undefined, { foo: headerSymbol }, false);
  expect(config.fetch.mock.calls[0][1].headers).toHaveProperty(
    'foo', headerSymbol
  );
});

test("rejects when there's an error", async () => {
  const config0 = {
    ShouldMockFetch: false,
    fetch: jest.fn(() => Promise.resolve({ ok: false })),
    mocks: [],
  };
  const api0 = new Api(config0);
  await expect(api0.get('/wow')).rejects.toBeDefined();

  const config1 = {
    ShouldMockFetch: false,
    fetch: jest.fn(() => Promise.reject(new Error('foo'))),
    mocks: [],
  };
  const api1 = new Api(config1);
  await expect(api1.get('/wow')).rejects.toBeDefined();
});
