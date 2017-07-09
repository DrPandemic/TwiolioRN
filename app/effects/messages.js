// @flow

import * as actions from '../actions/messages';
import { Message } from '../types';
import { FetchMessageThresholdInMinutes } from '../constants';

function fetchNextPage(
  api: any,
  url: ?string,
  headers: ?Object,
  expandRoute: boolean,
  messages: Array<Message>
): Promise<actions.successFetchMessages | actions.failFetchMessages> {
  if (url === null) {
    return Promise.resolve(actions.successFetchMessages(messages));
  }

  return api.get(url, null, headers, expandRoute)
    .then(r => r.json())
    .then(r => fetchNextPage(api, r.next_page_uri, null, false,
      messages.concat(r.messages.map(message => new Message(message)))))
    // Note: If one page fails, all the data is "lost"
    .catch(e => actions.failFetchMessages(e));
}

function pad(val: number) {
  return ('00' + val).slice(-2);
}

export function fetchMessages(
  api: any,
  lastFetch: ?Date = null,
): Promise<actions.successFetchMessages | actions.failFetchMessages> {
  let headers = null;
  if (lastFetch != null) {
    lastFetch.setMonth(lastFetch.getMonth() - 1);
    lastFetch.setMinutes(
      lastFetch.getMinutes() - FetchMessageThresholdInMinutes
    );

    const month = pad(lastFetch.getMonth() + 1);
    const day = pad(lastFetch.getDate());

    headers = {
      DateSent: `>${lastFetch.getFullYear()}-${month}-${day}`,
    };
  }

  return fetchNextPage(api, '/Messages.json', headers, true, []);
}
