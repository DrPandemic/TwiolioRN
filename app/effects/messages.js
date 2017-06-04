// @flow

import * as actions from '../actions/messages';
import * as types from '../actions/types';

export function fetchMessages(Api: any) {
  return Api.get('/Messages.json')
    .then(r => r.json())
    .then(r => actions.successFetchMessages(
      r.messages.map(message => new types.Message(message))
    ))
    .catch(e => actions.failFetchMessages(e));
}
