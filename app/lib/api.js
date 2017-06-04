// @flow

import Config from 'react-native-config';
import { Buffer } from 'buffer';

export default class Api {
  static headers() {
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

  static get(route, params = null) {
    return this.xhr(route, params, 'GET');
  }

  static head(route) {
    return this.xhr(route, null, 'HEAD');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static xhr(route, params, verb) {
    const host = 'https://api.twilio.com/2010-04-01/Accounts/';
    const url = `${host}${Config.TWILIO_ACCOUNT_SID}${route}`;
    const options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null,
      { headers: Api.headers() }
    );

    return fetch(url, options).then(resp => {
      if (resp.ok) {
        return resp;
      }
      throw `The result was not ok and with status ${resp.status}`;
    });
  }
}
