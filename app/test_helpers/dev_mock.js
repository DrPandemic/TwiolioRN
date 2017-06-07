// @flow

import { shouldMockFetch } from '../constants';
import mocks from './mock.json';

export default function (url: string, params: any) {
  const mock = mocks.find(m => m.method === params.method && url === m.url);
  if (__DEV__ && shouldMockFetch && mock) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mock.response),
    });
  } else {
    return fetch(url, params);
  }
}
