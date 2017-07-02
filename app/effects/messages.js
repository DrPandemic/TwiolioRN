// @flow

import * as actions from '../actions/messages';
import { Message } from '../types';

async function fetchNextPage(
  Api: any,
  url: ?string,
  params: ?any,
  expandRoute: boolean,
  messages: Array<Message>
): Promise<actions.successFetchMessages> {
  try {
    if (url === null) {
      return actions.successFetchMessages(messages);
    }

    let response = await Api.get(url, params, expandRoute);
    response = await response.json();

    return await fetchNextPage(
      Api,
      response.next_page_uri,
      undefined,
      false,
      messages.concat(response.messages.map(message => new Message(message)))
    );
  } catch(e) {
    return actions.failFetchMessages(e);
  }
}

export async function fetchMessages(
  Api: any
): Promise<actions.successFetchMessages | actions.failFetchMessages> {
  return fetchNextPage(Api, '/Messages.json', undefined, true, []);
}
