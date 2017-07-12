// @flow

import Config from 'react-native-config';
import { Buffer } from 'buffer';

import match from '../lib/match';
import { ShouldMockFetch } from '../constants';
import mocks from './mock.json';

function mockedFetch(url: string, options: any) {
  const mock = mocks.find(m =>
      m.method === options.method &&
      url === m.url
  );
  if (__DEV__ && ShouldMockFetch && mock) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mock.response),
    });
  }

  return fetch(url, options);
}

export default class Api {
  headers() {
    const auth = new Buffer(
      `${Config.TWILIO_ACCOUNT_SID}:${Config.TWILIO_AUTH_TOKEN}`
    );
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      dataType: 'json',
      Authorization: `Basic ${auth.toString('base64')}`,
    };
  }

  get(route: string, params: ?Object, headers: ?Object, expandRoute: boolean = true) {
    return this.xhr(route, params, headers, expandRoute, 'GET');
  }

  head(route: string, headers: ?Object, expandRoute: boolean = true) {
    return this.xhr(route, null, headers, expandRoute, 'HEAD');
  }

  put(route: string, params: ?Object, headers: ?Object, expandRoute: boolean = true) {
    return this.xhr(route, params, headers, expandRoute, 'PUT');
  }

  post(route: string, params: ?Object, headers: ?Object, expandRoute: boolean = true) {
    return this.xhr(route, params, headers, expandRoute, 'POST');
  }

  delete(route: string, params: ?Object, headers: ?Object, expandRoute: boolean = true) {
    return this.xhr(route, params, headers, expandRoute, 'DELETE');
  }

  xhr(route: string, params: ?Object, headers: ?Object, expandRoute: boolean, verb: string) {
    const host = 'https://api.twilio.com';
    const base = `/2010-04-01/Accounts/${Config.TWILIO_ACCOUNT_SID}`;
    const url = match(
      expandRoute, '',
      [true, `${host}${base}${route}`],
      [false, `${host}${route}`],
    );
    const options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null,
      {
        headers: {
          ...this.headers(),
          ...headers,
        }
      }
    );

    return mockedFetch(url, options).then(resp => {
      if (resp.ok) {
        return resp;
      }
      throw new Error(`The result was not ok and with status ${resp.status}`);
    });
  }
}

const api = new Api();
export function getApi() {
  return api;
}
