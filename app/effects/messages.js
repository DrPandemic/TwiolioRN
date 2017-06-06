// @flow

import * as actions from '../actions/messages';
import { Message } from '../types';

export function fetchMessages(Api: any) {
  return Api.get('/Messages.json')
    .then(r => r.json())
    .then(r => actions.successFetchMessages(
      r.messages.map(message => new Message(message))
    ))
    .catch(e => actions.failFetchMessages(e));
}
