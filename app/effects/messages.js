// @flow

import * as actions from '../actions/messages';
import { Message } from '../types';

function fetchNextPage(
  api: any,
  url: ?string,
  params: ?any,
  expandRoute: boolean,
  messages: Array<Message>
): Promise<actions.successFetchMessages | actions.failFetchMessages> {
  if (url === null) {
    return Promise.resolve(actions.successFetchMessages(messages));
  }

  return api.get(url, params, expandRoute)
    .then(r => r.json())
    .then(r => fetchNextPage(api, r.next_page_uri, undefined, false,
      messages.concat(r.messages.map(message => new Message(message)))))
    // Note: If one page fails, all the data is "lost"
    .catch(e => actions.failFetchMessages(e));
}

export function fetchMessages(
  api: any
): Promise<actions.successFetchMessages | actions.failFetchMessages> {
  return fetchNextPage(api, '/Messages.json', undefined, true, []);
}
